import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Quiz } from "../models/quiz";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class QuizService extends ApiService {
  public getUserQuizzes(userId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiUrl + `users/${userId}/quizzes`);
  }

  public removeQuiz(userId: number, quizId: number): Observable<undefined> {
    return this.http.delete<undefined>(this.apiUrl + `users/${userId}/quizzes/${quizId}`);
  }

  public toggleQuizOpenStatus(userId: number, quizId: number): Observable<undefined> {
    return this.http.put<undefined>(this.apiUrl + `users/${userId}/quizzes/${quizId}/open`, { observe: 'response' });
  }
}
