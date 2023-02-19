import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Question } from "../models/question";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends ApiService {
  public createQuestion(quizId: number, data: Question): Observable<Question> {
    return this.http.post<Question>(this.apiUrl + `quizzes/${quizId}/questions`, data);
  }

  public updateQuestion(quizId: number, data: Question): Observable<HttpResponse<undefined>> {
    return this.http.put<undefined>(this.apiUrl + `quizzes/${quizId}/questions/${data.id}`, data, { observe: 'response' });
  }

  public getQuizQuestions(quizId: number): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl + `quizzes/${quizId}/questions`);
  }
}
