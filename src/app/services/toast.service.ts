import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
  ) {}

  public show(message: string, duration: number = 2): void {
    this.snackBar.open(message, this.translateService.instant('dialog.ok'), {
      horizontalPosition: 'right',
      duration: duration * 1000,
    });
  }
}
