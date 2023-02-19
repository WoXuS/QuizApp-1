import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Quiz } from "../models/quiz";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class QuizService extends ApiService {
  public getUserQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiUrl + `quizzes`);
  }

  public removeQuiz(quizId: number): Observable<undefined> {
    return this.http.delete<undefined>(this.apiUrl + `quizzes/${quizId}`);
  }

  public toggleQuizOpenStatus(isOpen: boolean, quizId: number): Observable<undefined> {
    const status: string = isOpen ? 'close' : 'open';
    return this.http.patch<undefined>(this.apiUrl + `quizzes/${quizId}/${status}`, { observe: 'response' });
  }

  public createQuiz(data: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.apiUrl + 'quizzes', data);
  }

  public updateQuiz(data: Quiz): Observable<HttpResponse<undefined>> {
    return this.http.put<undefined>(this.apiUrl + `quizzes/${data.id}`, data, { observe: 'response' });
  }

  public getQuiz(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(this.apiUrl + `quizzes/${id}`);
  }
}
