import { QuizFull } from "./quiz-full";

export interface QuizAttempt {
  id: number;
  quizId: number;
  questionOrder: number[];
  chosenAnswers: number[];
  isOpen: boolean;
  quizCopy: QuizFull;
  userId: string;
}
