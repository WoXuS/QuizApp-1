import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs";
import { QuizInfo } from "src/app/models/quiz-info";
import { QuizResult } from "src/app/models/quiz-result";
import { UserService } from "src/app/services/user.service";
import * as moment from 'moment';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
})
export class QuizResultsComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['userName', 'endDate', 'correctAnswers', 'incorrectAnswers', 'successRatio'];
  public pageSize = 15;
  public pageSizeOptions = [1, 5, 10, 15, 20, 25, 50, 100];

  public userNames = new Map<string, string>();
  public quiz!: QuizInfo;
  public results = new MatTableDataSource<QuizResult>();

  @ViewChild(MatSort) sorter!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.results.data = this.route.snapshot.data['results'];
    this.quiz = this.route.snapshot.data['info'];

    for (const userId of this.results.data.map(x => x.userId)) {
      if (!this.userNames.has(userId)) {
        this.userService.getUserName(userId).pipe(take(1)).subscribe({
          next: (name: string) => this.userNames.set(userId, name)
        });
      }
    }
  }

  public ngAfterViewInit(): void {
    this.results.sort = this.sorter;
    this.results.paginator = this.paginator;
  }

  public getUserName(id: string): string {
    return this.userNames.get(id) || '';
  }

  public getFinishDate(date: string): string {
    return moment(date).format('DD.MM.YYYY HH:mm')
  }
}
