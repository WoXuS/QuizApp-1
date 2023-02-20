export interface AttemptResult {
  id: number;
  submitted: string;
  chosenCorrectAnswers: number;
  chosenIncorrectAnswers: number;
  allCorrectAnswers: number;
  successRatio: number;
}
