import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { firstValueFrom, Observable } from "rxjs";
import { Question } from "../models/question";
import { QuestionFull } from "../models/question-full";
import { QuizFull } from "../models/quiz-full";
import { AnswerService } from "../services/answer.service";
import { QuestionService } from "../services/question.service";
import { QuizService } from "../services/quiz.service";

@Injectable({
  providedIn: 'root'
})
export class QuizResolver implements Resolve<QuizFull> {
  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
    private answerService: AnswerService,
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): QuizFull | Observable<QuizFull> | Promise<QuizFull> {
    return new Promise<QuizFull>(async resolve => {
      const quiz: QuizFull = await firstValueFrom(this.quizService.getQuiz(route.params['id']));
      if (!quiz) {
        throw new Error("Can't find quiz");
      }
      quiz.questions = [];
      const questions: Question[] = await firstValueFrom(this.questionService.getQuizQuestions(quiz.id!));
      if (!questions) {
        resolve(quiz);
        return;
      }

      for (const q of questions) {
        const fullQuestion: QuestionFull = q;
        fullQuestion.answers = await firstValueFrom(this.answerService.getQuestionsAnswers(quiz.id!, q.id!));
        quiz.questions.push(fullQuestion);
      }

      resolve(quiz);
    });
  }
}
