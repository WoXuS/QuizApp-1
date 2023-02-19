import { Answer } from "./answer";
import { Question } from "./question";

export interface QuestionFull extends Question {
  answers?: Answer[];
}

export function getQuestionToSend(questionFull: QuestionFull): Question {
  const copy: QuestionFull = Object.assign({}, questionFull);
  delete copy.answers;
  return copy;
}
