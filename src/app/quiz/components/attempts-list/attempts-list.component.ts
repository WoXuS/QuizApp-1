import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs";
import { QuizAttempt } from "src/app/models/quiz-attempt";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-attempts-list',
  templateUrl: './attempts-list.component.html',
})
export class AttemptsListComponent implements OnInit, AfterViewInit {
  private userNames = new Map<string, string>();

  public displayedColumns: string[] = ['quizName', 'userName', 'status', 'buttons'];
  public pageSize = 15;
  public pageSizeOptions = [1, 5, 10, 15, 20, 25, 50, 100];

  public attempts = new MatTableDataSource<QuizAttempt>();

  @ViewChild(MatSort) sorter!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.attempts.data = this.route.snapshot.data['attempts'];
    for (const userId of this.attempts.data.map(x => x.quizCopy.userId!)) {
      if (!this.userNames.has(userId)) {
        this.userService.getUserName(userId).pipe(take(1)).subscribe({
          next: (name: string) => this.userNames.set(userId, name)
        });
      }
    }
  }

  public ngAfterViewInit(): void {
    this.attempts.sort = this.sorter;
    this.attempts.paginator = this.paginator;
  }

  public getUserName(id: string): string {
    return this.userNames.get(id) || '';
  }
}
