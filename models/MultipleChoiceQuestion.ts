import { Question, QUESTION_TYPE } from "./Question";
import { Answer } from "./Answer";

export class MultipleChoiceQuestion implements Question {
  constructor(questionText: string, answers: Answer[]) {
    this.questionText = questionText;
    this.answers = answers;
  }
  type: QUESTION_TYPE = "CHOICE_MULTIPLE";
  questionText: string;
  answers: Answer[];
}
