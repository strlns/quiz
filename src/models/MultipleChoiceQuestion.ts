import { Question } from "./Question";

export interface MultipleChoiceQuestion extends Question {
  type: "CHOICE_MULTIPLE";
}
