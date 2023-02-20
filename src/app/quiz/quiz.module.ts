import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialModule } from "../material.module";
import { AttemptEntryComponent } from "./components/attempt-entry/attempt-entry.component";
import { AttemptComponent } from "./components/attempt/attempt.component";
import { AttemptsListComponent } from "./components/attempts-list/attempts-list.component";
import { QuizEditorComponent } from "./components/quiz-editor/quiz-editor.component";
import { QuizListComponent } from "./components/quiz-list/quiz-list.components";
import { QuizRoutingModule } from "./quiz.routing";

@NgModule({
  declarations: [
    QuizListComponent,
    QuizEditorComponent,
    AttemptEntryComponent,
    AttemptComponent,
    AttemptsListComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    QuizRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [

  ],
})
export class QuizModule {}
