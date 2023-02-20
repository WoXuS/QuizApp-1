import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialModule } from "../material.module";
import { AttemptEntryComponent } from "./components/attempt-entry/attempt-entry.component";
import { AttemptResultComponent } from "./components/attempt-result/attempt-result.component";
import { AttemptComponent } from "./components/attempt/attempt.component";
import { AttemptsListComponent } from "./components/attempts-list/attempts-list.component";
import { QuizEditorComponent } from "./components/quiz-editor/quiz-editor.component";
import { QuizListComponent } from "./components/quiz-list/quiz-list.components";
import { QuizResultsComponent } from "./components/quiz-results/quiz-results.component";
import { QuizRoutingModule } from "./quiz.routing";

@NgModule({
  declarations: [
    QuizListComponent,
    QuizEditorComponent,
    QuizResultsComponent,
    AttemptEntryComponent,
    AttemptComponent,
    AttemptsListComponent,
    AttemptResultComponent,
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
