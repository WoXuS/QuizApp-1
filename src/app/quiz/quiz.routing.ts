import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AttemptResolver } from "../resolvers/attempt.resolver";
import { AttemptsResolver } from "../resolvers/attempts.resolver";
import { QuizResolver } from "../resolvers/quiz.resolver";
import { AttemptEntryComponent } from "./components/attempt-entry/attempt-entry.component";
import { AttemptComponent } from "./components/attempt/attempt.component";
import { AttemptsListComponent } from "./components/attempts-list/attempts-list.component";
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
  },
  {
    path: 'edit/:id',
    component: QuizEditorComponent,
    resolve: {
      quiz: QuizResolver,
    }
  },
  {
    path: 'try',
    component: AttemptEntryComponent,
  },
  {
    path: 'attempt/:id',
    component: AttemptComponent,
    resolve: {
      attempt: AttemptResolver,
    }
  },
  {
    path: 'attempts',
    component: AttemptsListComponent,
    resolve: {
      attempts: AttemptsResolver,
    }
  },
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
