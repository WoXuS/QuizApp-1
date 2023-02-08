import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Quiz } from "../models/quiz";
import { QuizService } from "../services/quiz.service";

export class UserQuizzesResolver implements Resolve<Quiz[]> {
  constructor(private quizService: QuizService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Quiz[] | Observable<Quiz[]> | Promise<Quiz[]> {
    return this.quizService.getUserQuizzes(1);
  }
}
