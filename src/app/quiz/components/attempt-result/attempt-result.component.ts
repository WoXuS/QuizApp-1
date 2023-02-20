import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AttemptResult } from "src/app/models/attempt-result";
import { QuestionFull } from "src/app/models/question-full";
import { QuizAttempt } from "src/app/models/quiz-attempt";
import { ToastService } from "src/app/services/toast.service";
import * as moment from 'moment';
import { UserService } from "src/app/services/user.service";
import { BehaviorSubject, Observable, take } from "rxjs";

@Component({
  selector: 'app-attempt-result',
  templateUrl: './attempt-result.component.html',
  styleUrls: ['./attempt-result.component.scss'],
})
export class AttemptResultComponent implements OnInit {
  public attempt!: QuizAttempt;
  public result!: AttemptResult;
  public quizAuthorName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private toast: ToastService,
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.attempt = this.route.snapshot.data['attempt'];
    this.result = this.route.snapshot.data['result'];

    if (this.attempt.isOpen) {
      this.router.navigate([`quiz/attempt/${this.attempt.id}`]).then(() => this.toast.show(this.translate.instant('attempt.result.notClosed')));
      return;
    }

    this.userService.getUserName(this.attempt.quizCopy.userId!).pipe(take(1)).subscribe({
      next: (name: string) => this.quizAuthorName = name
    });
  }

  public getQuestion(id: number): QuestionFull {
    return this.attempt.quizCopy.questions!.find(q => q.id === id)!;
  }

  public isAnswerChosen(answerId: number, questionIdx: number): boolean {
    return this.attempt.chosenAnswers[questionIdx] === answerId;
  }

  public isQuestionCorrect(question: QuestionFull, idx: number): boolean {
    return question.answers!.find(a => a.id === this.attempt.chosenAnswers[idx])!.isCorrect;
  }

  public getFinishDate(date: string): string {
    return moment(date).format('DD.MM.YYYY HH:mm')
  }
}
