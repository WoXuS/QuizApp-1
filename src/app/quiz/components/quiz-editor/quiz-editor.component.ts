import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { firstValueFrom, forkJoin, map, Observable, Subscription, take } from "rxjs";
import { Answer } from "src/app/models/answer";
import { Question } from "src/app/models/question";
import { getQuestionToSend, QuestionFull } from "src/app/models/question-full";
import { Quiz } from "src/app/models/quiz";
import { getQuizToSend, QuizFull } from "src/app/models/quiz-full";
import { AnswerService } from "src/app/services/answer.service";
import { LoaderService } from "src/app/services/loader.service";
import { QuestionService } from "src/app/services/question.service";
import { QuizService } from "src/app/services/quiz.service";
import { ToastService } from "src/app/services/toast.service";
import { AnswerToDelete } from "./models/answer-to-delete";

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.scss'],
})
export class QuizEditorComponent implements OnInit {
  public form!: FormGroup;

  public get isPageLoaded(): boolean {
    return this.loaderService.isPageLoaded;
  }

  private quiz: QuizFull | undefined;

  public get questionsFormArray(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  public get isNewMode(): boolean {
    return !!this.quiz;
  }

  private questionsToRemove: number[] = [];
  private answersToRemove: AnswerToDelete[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private translate: TranslateService,
    private quizService: QuizService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      randomOrder: [true],
      movingBetween: [true],
      showCorrect: [false],
      questions: this.formBuilder.array([]),
    });

    const quiz: QuizFull = this.route.snapshot.data['quiz'];
    if (!!quiz) {
      console.info('QUIZ ', quiz);
      this.form.patchValue(quiz);
      if (!!quiz.questions) {
        for (const q of quiz.questions) {
          this.addQuestion(q);
        }
      }
      this.quiz = quiz;
    }
  }

  public addQuestion(data: QuestionFull | null = null): void {
    const question: FormGroup = this.formBuilder.group({
      id: [data ? data.id : ''],
      text: [data ? data.text : '', Validators.required],
      answers: this.formBuilder.array([]),
    });
    if (data?.answers) {
      for (const a of data.answers) {
        this.addAnswer(this.getFormArray(question.get('answers')), a);
      }
    } else {
      this.addAnswer(this.getFormArray(question.get('answers')));
    }
    this.questionsFormArray.push(question);
  }

  public addAnswer(answers: FormArray, data: Answer | null = null): void {
    answers.push(this.formBuilder.group({
      id: [data ? data.id : ''],
      text: [data ? data.text : '', Validators.required],
      isCorrect: [data ? data.isCorrect : false],
    }));
  }

  public getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  public getFormArray(control: AbstractControl | null): FormArray {
    return control as FormArray;
  }

  public saveChanges(): void {
    this.loaderService.beginLongAction();
    const parsedQuiz: QuizFull = this.form.value;
    const quizToSend: Quiz = getQuizToSend(parsedQuiz);

    if (this.quiz) {
      quizToSend.id = this.quiz.id;
      this.quizService.updateQuiz(quizToSend).pipe(take(1)).subscribe({
        next: async () => {
          console.log("Updated quiz", quizToSend);
          const result: boolean = await this.saveQuestions(parsedQuiz.questions!);
          this.saveChangesResult(result);
        },
        error: (e) => {
          console.error(e);
          this.saveChangesResult(false);
        }
      });
    } else {
      delete quizToSend.id;
      this.quizService.createQuiz(quizToSend).pipe(take(1)).subscribe({
        next: async (created: Quiz) => {
          console.log("Created quiz", quizToSend);
          this.quiz = created;
          const result: boolean = await this.saveQuestions(parsedQuiz.questions!);
          this.saveChangesResult(result);
        },
        error: (e) => {
          console.error(e);
          this.saveChangesResult(false, true);
        }
      });
    }
  }

  private saveChangesResult(isSuccess: boolean, isCreate: boolean = false): void {
    this.loaderService.endLongAction();
    if (isSuccess) {
      this.toastService.show(this.translate.instant('quiz.editor.saved'));
      this.router.navigate(['/quiz/list']);
    } else {
      this.toastService.show(this.translate.instant('quiz.editor.' + isCreate ? 'createQuizError' : 'updateQuizError'));
    }
  }

  private saveQuestions(questions: QuestionFull[]): Promise<boolean> {
    return new Promise<boolean>(async resolve => {
      while (this.questionsToRemove.length) {
        const id: number = this.questionsToRemove.pop()!;
        const result: boolean = await firstValueFrom(this.removeQuestion(id));
        if (!result) {
          this.questionsToRemove.push(id);
          resolve(false);
          return;
        }
      }

      while (this.answersToRemove.length) {
        const tuple: AnswerToDelete = this.answersToRemove.pop()!;
        const result: boolean = await firstValueFrom(this.removeAnswer(tuple.questionId, tuple.answerId));
        if (!result) {
          this.answersToRemove.push(tuple);
          resolve(false);
          return;
        }
      }

      if (!questions) {
        resolve(true);
        return;
      }
      for (const question of questions) {
        const result: boolean = await firstValueFrom(this.saveQuestion(question));
        if (!result) {
          resolve(false);
          return;
        }
      }
      resolve(true);
    });
  }

  private saveQuestion(question: QuestionFull): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const questionToSend: Question = getQuestionToSend(question);
        if (question.id) {
          this.questionService.updateQuestion(this.quiz!.id!, questionToSend).pipe(take(1)).subscribe({
            next: async () => {
              console.log("Updated question", question);
              const result: boolean = await firstValueFrom(this.saveAnswers(questionToSend.id!, question.answers!));
              observer.next(result)
            }
          });
        } else {
          delete questionToSend.id;
          this.questionService.createQuestion(this.quiz!.id!, questionToSend).pipe(take(1)).subscribe({
            next: async (created: Question) => {
              console.log("Created question", created);
              const result: boolean = await firstValueFrom(this.saveAnswers(created.id!, question.answers!));
              observer.next(result);
            }
          });
        }
    });
  }

  private saveAnswers(questionId: number, answers: Answer[]): Observable<boolean> {
    return new Observable<boolean>(observer => {
      if (!answers) {
        observer.next(true);
        return;
      }

      const tasks: Observable<boolean>[] = [];
      for (const answer of answers) {
        if (answer.id) {
          tasks.push(this.answerService.updateAnswer(this.quiz!.id!, questionId, answer).pipe(take(1), map(x => !!x)));
        } else {
          delete answer.id;
          tasks.push(this.answerService.createAnswer(this.quiz!.id!, questionId, answer).pipe(take(1), map(x => !!x)));
        }
      }

      forkJoin(tasks).subscribe({
        complete: () => observer.next(true),
        error: (e) => {
          console.error(e);
          observer.next(false);
          observer.error(e);
        }
      });
    });
  }

  public cancelEdit(): void {
    this.router.navigate(['/quiz/list']);
  }

  public deleteQuestion(idx: number, question: AbstractControl): void {
    const id: number = question.get('id')?.value;
    if (!!id) {
      this.questionsToRemove.push(id);
    }
    this.questionsFormArray.removeAt(idx);
  }

  public deleteAnswer(idx: number, question: AbstractControl, answer: AbstractControl): void {
    const answerId: number = answer.get('id')?.value;
    const questionId: number = question.get('id')?.value;
    if (!!answerId && !!questionId) {
      this.answersToRemove.push({
        answerId,
        questionId,
      });
    }
    this.getFormArray(question.get('answers')).removeAt(idx);
  }

  private removeQuestion(questionId: number): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.questionService.removeQuestion(this.quiz!.id!, questionId).subscribe({
        next: () => observer.next(true),
        error: (e) => {
          console.error(e);
          observer.next(false);
          observer.error(e);
        }
      });
    });
  }

  private removeAnswer(questionId: number, answerId: number): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.answerService.removeAnswer(this.quiz!.id!, questionId, answerId).subscribe({
        next: () => observer.next(true),
        error: (e) => {
          console.error(e);
          observer.next(false);
          observer.error(e);
        }
      });
    });
  }
}
