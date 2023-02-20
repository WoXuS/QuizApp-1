import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { QuizResult } from "../models/quiz-result";
import { QuizService } from "../services/quiz.service";

@Injectable({
  providedIn: 'root'
})
export class QuizResultsResolver implements Resolve<QuizResult[]> {
  constructor(
    private quizService: QuizService,
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): QuizResult[] | Observable<QuizResult[]> | Promise<QuizResult[]> {
    return this.quizService.getQuizResults(route.params['id']);
  }
}
