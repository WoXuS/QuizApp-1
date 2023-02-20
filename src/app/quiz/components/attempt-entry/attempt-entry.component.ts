import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs";
import { QuizAttempt } from "src/app/models/quiz-attempt";
import { QuizInfo } from "src/app/models/quiz-info";
import { AttemptService } from "src/app/services/attempt.service";
import { QuizService } from "src/app/services/quiz.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: 'app-attempt-entry',
  templateUrl: './attempt-entry.component.html',
  styleUrls: ['./attempt-entry.component.scss'],
})
export class AttemptEntryComponent {
  public quizIdText: string = '';
  public isLoading: boolean = false;
  public quiz: QuizInfo | null = null;

  constructor(
    private translate: TranslateService,
    private toast: ToastService,
    private quizService: QuizService,
    private attemptService: AttemptService,
    private router: Router,
  ) {}

  public loadQuizInfo(): void {
    this.isLoading = true;
    this.quizService.getQuizInfo(Number(this.quizIdText)).pipe(take(1)).subscribe({
      next: (quiz: QuizInfo) => {
        this.quiz = quiz;
        this.isLoading = false;
      },
      error: (e) => {
        console.error(e);
        this.isLoading = false;
        this.toast.show(this.translate.instant('attempt.entry.quizGetError'));
      }
    });
  }

  public confirmAttempt(): void {
    this.isLoading = true;
    this.attemptService.createAttempt(Number(this.quizIdText)).pipe(take(1)).subscribe({
      next: (attempt: QuizAttempt) => {
        this.router.navigate([`quiz/attempt/${attempt.id}`]);
      },
      error: (e) => {
        this.isLoading = false;
        console.error(e);
        this.toast.show(this.translate.instant('attempt.entry.quizCreateAttemptError'));
      }
    });
  }

  public cancelQuiz(): void {
    this.quiz = null;
  }
}
