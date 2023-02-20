import { AttemptResult } from "./attempt-result";

export interface QuizResult {
  userId: string;
  result: AttemptResult;
}
