import { Question, QUESTION_TYPE } from "./Question";

export class BooleanQuestion implements Question {
  constructor(questionText: string, answer?: boolean) {
    this.questionText = questionText;
    this.answer = answer;
  }
  type: QUESTION_TYPE = "BOOLEAN";
  questionText: string;
  answer: boolean | undefined;
}
