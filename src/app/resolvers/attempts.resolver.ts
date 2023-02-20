import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { QuizAttempt } from "../models/quiz-attempt";
import { AttemptService } from "../services/attempt.service";

@Injectable({
  providedIn: 'root'
})
export class AttemptsResolver implements Resolve<QuizAttempt[]> {
  constructor(
    private attemptService: AttemptService,
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): QuizAttempt[] | Observable<QuizAttempt[]> | Promise<QuizAttempt[]> {
    return this.attemptService.getAllAttempts();
  }
}
