import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialModule } from "../material.module";
import { ConfirmDialogComponent } from "./dialogs/confirm-dialog/confirm-dialog.component.";
import { RemoveDialogComponent } from "./dialogs/remove-dialog/remove-dialog.component";

@NgModule({
  declarations: [
    RemoveDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
  ],
  exports: [
    RemoveDialogComponent,
    ConfirmDialogComponent,
  ]
})
export class SharedModule {}
