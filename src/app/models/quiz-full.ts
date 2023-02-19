import { QuestionFull } from "./question-full";
import { Quiz } from "./quiz";

export interface QuizFull extends Quiz {
  questions?: QuestionFull[];
}

export function getQuizToSend(quizFull: QuizFull): Quiz {
  const copy: QuizFull = Object.assign({}, quizFull);
  delete copy.questions;
  return copy;
}
