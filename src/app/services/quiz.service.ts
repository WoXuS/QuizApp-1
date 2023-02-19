import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Quiz } from "../models/quiz";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class QuizService extends ApiService {
  public getUserQuizzes(userId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiUrl + `quizzes`);
  }

  public removeQuiz(quizId: number): Observable<undefined> {
    return this.http.delete<undefined>(this.apiUrl + `quizzes/${quizId}`);
  }

  public toggleQuizOpenStatus(isOpen: boolean, quizId: number): Observable<undefined> {
    const status: string = isOpen ? 'close' : 'open';
    return this.http.patch<undefined>(this.apiUrl + `quizzes/${quizId}/${status}`, { observe: 'response' });
  }
}
