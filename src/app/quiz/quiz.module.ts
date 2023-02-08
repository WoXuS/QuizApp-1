import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialModule } from "../material.module";
import { QuizListComponent } from "./components/quiz-list/quiz-list.components";
import { QuizRoutingModule } from "./quiz.routing";

@NgModule({
  declarations: [
    QuizListComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    QuizRoutingModule,
    MaterialModule,
  ],
  providers: [

  ],
})
export class QuizModule {}
