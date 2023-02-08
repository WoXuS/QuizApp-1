import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs";
import { Quiz } from "src/app/models/quiz";
import { QuizService } from "src/app/services/quiz.service";
import { ToastService } from "src/app/services/toast.service";
import { ConfirmDialogComponent } from "src/app/shared/dialogs/confirm-dialog/confirm-dialog.component.";
import { RemoveDialogComponent } from "src/app/shared/dialogs/remove-dialog/remove-dialog.component";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.components.html',
})
export class QuizListComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['name', 'description', 'isOpen', 'buttons'];
  public pageSize = 15;
  public pageSizeOptions = [1, 5, 10, 15, 20, 25, 50, 100];

  public quizzes = new MatTableDataSource<Quiz>();

  @ViewChild(MatSort) sorter!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private quizService: QuizService,
    private dialog: MatDialog,
    private translateService: TranslateService,
    private toastService: ToastService,
  ) {}

  public ngOnInit(): void {
    this.refreshQuizzes();
  }

  public ngAfterViewInit(): void {
      this.quizzes.sort = this.sorter;
      this.quizzes.paginator = this.paginator;
  }

  private refreshQuizzes(): void {
    this.quizService.getUserQuizzes(1).pipe(take(1)).subscribe({
      next: (data) => this.quizzes.data = data
    });
  }

  public openRemoveQuizDialog(quizId: number): void {
    const quiz: Quiz | undefined = this.quizzes.data.find(x => x.id === quizId);
    if (!quiz) {
      console.warn('Can not find quiz to remove', quizId);
      return;
    }
    const dialog = this.dialog.open(RemoveDialogComponent, {
      data: {
        type: this.translateService.instant('quiz.list.removeType'),
        name: quiz.name
      }
    });

    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.quizService.removeQuiz(1, quizId).pipe(take(1)).subscribe({
            next: () => {
              this.toastService.show(this.translateService.instant('quiz.list.removeSuccess'));
              this.refreshQuizzes();
            },
            error: (e) => {
              console.error(e);
              this.toastService.show(this.translateService.instant('quiz.list.removeError'));
            }
          });
        }
      }
    });
  }

  public openChangeIsOpenDialog(quizId: number): void {
    const quiz: Quiz | undefined = this.quizzes.data.find(x => x.id === quizId);
    if (!quiz) {
      console.warn('Can not find quiz to change visibility', quizId);
      return;
    }
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: this.translateService.instant('quiz.list.changeIsOpenQuestion', {
        name: quiz.name,
        status: this.translateService.instant('quiz.list.statusOpen' + (quiz.isOpen ? 'No' : 'Yes'))
      })
    });

    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.quizService.toggleQuizOpenStatus(1, quizId).pipe(take(1)).subscribe({
            next: () => {
              this.toastService.show(this.translateService.instant('quiz.list.toggleOpenStatusSuccess'));
              quiz.isOpen = !quiz.isOpen;
            },
            error: (e) => {
              console.error(e);
              this.toastService.show(this.translateService.instant('quiz.list.toggleOpenStatusError'));
            }
          });
        }
      }
    });
  }
}