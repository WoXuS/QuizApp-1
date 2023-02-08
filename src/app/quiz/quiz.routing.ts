import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuizListComponent } from "./components/quiz-list/quiz-list.components";

const routes: Routes = [
  {
    path: '',
    component: QuizListComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class QuizRoutingModule {}
