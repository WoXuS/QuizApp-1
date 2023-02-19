import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Answer } from "../models/answer";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AnswerService extends ApiService {
  public createAnswer(quizId: number, questionId: number, data: Answer): Observable<Answer> {
    return this.http.post<Answer>(this.apiUrl + `quizzes/${quizId}/questions/${questionId}/answers`, data);
  }

  public updateAnswer(quizId: number, questionId: number, data: Answer): Observable<HttpResponse<undefined>> {
    return this.http.put<undefined>(this.apiUrl + `quizzes/${quizId}/questions/${questionId}/answers/${data.id}`, data, { observe: 'response' });
  }

  public getQuestionsAnswers(quizId: number, questionId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(this.apiUrl + `quizzes/${quizId}/questions/${questionId}/answers`);
  }
}
