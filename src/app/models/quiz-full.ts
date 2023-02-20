import { QuestionFull } from "./question-full";
import { Quiz } from "./quiz";

export interface QuizFull extends Quiz {
  questions?: QuestionFull[];
  userId?: string;
}

export function getQuizToSend(quizFull: QuizFull): Quiz {
  const copy: QuizFull = Object.assign({}, quizFull);
  delete copy.questions;
  delete copy.userId;
  return copy;
}
