import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AttemptResultResolver } from "../resolvers/attempt-result.resolver";
import { AttemptResolver } from "../resolvers/attempt.resolver";
import { AttemptsResolver } from "../resolvers/attempts.resolver";
import { QuizInfoResolver } from "../resolvers/quiz-info.resolver";
import { QuizResultsResolver } from "../resolvers/quiz-results.resolver";
import { QuizResolver } from "../resolvers/quiz.resolver";
import { AttemptEntryComponent } from "./components/attempt-entry/attempt-entry.component";
import { AttemptResultComponent } from "./components/attempt-result/attempt-result.component";
import { AttemptComponent } from "./components/attempt/attempt.component";
import { AttemptsListComponent } from "./components/attempts-list/attempts-list.component";
import { QuizEditorComponent } from "./components/quiz-editor/quiz-editor.component";
import { QuizListComponent } from "./components/quiz-list/quiz-list.components";
import { QuizResultsComponent } from "./components/quiz-results/quiz-results.component";

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
    path: 'results/:id',
    component: QuizResultsComponent,
    resolve: {
      results: QuizResultsResolver,
      info: QuizInfoResolver,
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
  {
    path: 'result/:id',
    component: AttemptResultComponent,
    resolve: {
      result: AttemptResultResolver,
      attempt: AttemptResolver,
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
