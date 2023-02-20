import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { QuizInfo } from "../models/quiz-info";
import { QuizService } from "../services/quiz.service";

@Injectable({
  providedIn: 'root'
})
export class QuizInfoResolver implements Resolve<QuizInfo> {
  constructor(
    private quizService: QuizService,
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): QuizInfo | Observable<QuizInfo> | Promise<QuizInfo> {
    return this.quizService.getQuizInfo(route.params['id']);
  }
}
