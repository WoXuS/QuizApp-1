import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuizEditorComponent } from "./components/quiz-editor/quiz-editor.component";
import { QuizListComponent } from "./components/quiz-list/quiz-list.components";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: QuizListComponent,
  },
  {
    path: 'new',
    component: QuizEditorComponent,
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
