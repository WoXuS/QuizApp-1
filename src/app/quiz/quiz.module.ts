import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialModule } from "../material.module";
import { QuizEditorComponent } from "./components/quiz-editor/quiz-editor.component";
import { QuizListComponent } from "./components/quiz-list/quiz-list.components";
import { QuizRoutingModule } from "./quiz.routing";

@NgModule({
  declarations: [
    QuizListComponent,
    QuizEditorComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    QuizRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [

  ],
})
export class QuizModule {}
