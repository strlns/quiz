import { Question } from "./Question";
import { Answer } from "./Answer";

export interface BooleanQuestion extends Question {
  answers: [Answer, Answer];
  type: "BOOLEAN";
}
