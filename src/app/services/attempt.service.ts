import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { QuizAttempt } from "../models/quiz-attempt";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AttemptService extends ApiService {
  public createAttempt(quizId: number): Observable<QuizAttempt> {
    return this.http.post<QuizAttempt>(this.apiUrl + `attempts?quizId=${quizId}`, null);
  }

  public getAttempt(id: number): Observable<QuizAttempt> {
    return this.http.get<QuizAttempt>(this.apiUrl + `attempts/${id}`);
  }

  public saveAnswers(id: number, chosenAnswers: number[]): Observable<undefined> {
    return this.http.patch<undefined>(this.apiUrl + `attempts/${id}`, { chosenAnswers });
  }

  public closeAttempt(id: number): Observable<undefined> {
    return this.http.patch<undefined>(this.apiUrl + `attempts/${id}/close`, null);
  }
}
