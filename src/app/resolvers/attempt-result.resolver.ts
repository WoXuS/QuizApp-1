import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AttemptResult } from "../models/attempt-result";
import { AttemptService } from "../services/attempt.service";

@Injectable({
  providedIn: 'root'
})
export class AttemptResultResolver implements Resolve<AttemptResult> {
  constructor(
    private attemptService: AttemptService,
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AttemptResult | Observable<AttemptResult> | Promise<AttemptResult> {
    return this.attemptService.getAttemptResult(route.params['id']);
  }
}
