import { Question } from "./Question";

export interface SingleChoiceQuestion extends Question {
  type: "CHOICE_SINGLE";
}
