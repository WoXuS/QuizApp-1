import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { AdminLogEntry } from "src/app/models/admin-log-entry";
import * as moment from 'moment';

@Component({
  selector: 'app-admin-logs',
  templateUrl: './admin-logs.component.html',
})
export class AdminLogsComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['event', 'user', 'status', 'time'];
  public pageSize = 50;
  public pageSizeOptions = [1, 5, 10, 15, 20, 25, 50, 100, 150, 200, 250, 300, 500, 1000];

  public entries = new MatTableDataSource<AdminLogEntry>();

  @ViewChild(MatSort) sorter!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.entries.data = this.route.snapshot.data['logs'];
  }

  public ngAfterViewInit(): void {
    this.entries.sort = this.sorter;
    this.entries.paginator = this.paginator;
  }

  public getDisplayTime(time: string): string {
    return moment(time).format('DD.MM.YYYY HH:mm:ss')
  }
}
