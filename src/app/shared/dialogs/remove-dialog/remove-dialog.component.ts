import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RemoveDialogData } from "./remove-dialog-data";

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
})
export class RemoveDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RemoveDialogData
  ) {}
}
