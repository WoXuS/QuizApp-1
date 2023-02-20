import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs";
import { QuestionFull } from "src/app/models/question-full";
import { QuizAttempt } from "src/app/models/quiz-attempt";
import { AttemptService } from "src/app/services/attempt.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.component.html',
  styleUrls: ['./attempt.component.scss'],
})
export class AttemptComponent implements OnInit {
  private attempt!: QuizAttempt;

  public activeQuestion!: QuestionFull;
  public isFirstQuestion: boolean = true;
  public isLastQuestion: boolean = true;
  public isLoading = false;

  public selectedAnswer: number | null = null;

  public get quizName(): string {
    return this.attempt.quizCopy.name;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private attemptService: AttemptService,
    private translate: TranslateService,
    private toast: ToastService,
  ) {}

  public ngOnInit(): void {
    this.attempt = this.route.snapshot.data['attempt'];
    console.log(this.attempt);
    if (!this.attempt.isOpen) {
      this.router.navigate([`quiz/result/${this.attempt.id}`]).then(() => this.toast.show(this.translate.instant('attempt.try.alreadyClosed')));
      return;
    }
    this.loadQuestion(this.getNextQuestionId());
  }

  public next(): void {
    this.isLoading = true;
    this.attempt.chosenAnswers.push(this.selectedAnswer!);
    this.attemptService.saveAnswers(this.attempt.id, this.attempt.chosenAnswers).pipe(take(1)).subscribe({
      next: () => {
        if (this.isLastQuestion) {
          this.finishAttempt();
        } else {
          this.loadNextQuestion();
        }
      },
      error: (e) => {
        this.isLoading = false;
        console.error(e);
        this.toast.show(this.translate.instant('attempt.try.saveAnswerError'));
      }
    });
  }

  private loadNextQuestion(): void {
    const nextId: number = this.getNextQuestionId();
    this.isLoading = false;
    if (nextId > 0) {
      this.loadQuestion(nextId);
    } else {
      console.warn('No next question!');
    }
  }

  private loadQuestion(id: number): void {
    const question: QuestionFull | undefined = this.attempt.quizCopy.questions?.find(q => q.id === id);
    if (!!question) {
      this.activeQuestion = question;
    }
    this.isFirstQuestion = this.attempt.questionOrder.indexOf(id) === 0;
    this.isLastQuestion = this.attempt.questionOrder.indexOf(id) === this.attempt.questionOrder.length - 1;
  }

  private getNextQuestionId(): number {
    if (this.attempt.chosenAnswers.length) {
      const currentIdx: number = !!this.activeQuestion
        ? this.attempt.questionOrder.indexOf(this.activeQuestion.id!)
        : this.attempt.chosenAnswers.length - 1;
      if (currentIdx + 1 < this.attempt.questionOrder.length) {
        return this.attempt.questionOrder[currentIdx + 1];
      } else {
        return -1;
      }
    } else {
      return this.attempt.questionOrder[0];
    }
  }

  private finishAttempt(): void {
    this.attemptService.closeAttempt(this.attempt.id).pipe(take(1)).subscribe({
      next: () => {
        this.router.navigate([`quiz/result/${this.attempt.id}`]).then(() => this.toast.show(this.translate.instant('attempt.try.finished')));
      },
      error: (e) => {
        this.isLoading = false;
        console.error(e);
        this.toast.show(this.translate.instant('attempt.try.saveAnswerError'));
      }
    });
  }
}
