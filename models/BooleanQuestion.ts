import { Question, QUESTION_TYPE } from "./Question";
import { Answer } from "./Answer";

export class BooleanQuestion implements Question {
  constructor(questionText: string, answers?: [Answer, Answer]) {
    this.questionText = questionText;
    this.answers = answers ?? [];
  }
  type: QUESTION_TYPE = "BOOLEAN";
  questionText: string;
  answers: [Answer, Answer] | [];
  get solution() {
    const correctAnswers = this.answers.filter((answer) => answer.isSolution);
    if (correctAnswers.length === 1) {
      return correctAnswers[0];
    }
  }
}
