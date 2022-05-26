import { Answer, AnswerSerializable } from "./Answer";

export interface Question {
  type: QUESTION_TYPE;
  questionText: string;
  timeLimit?: number;
  answers: Answer[];
  get solution(): Answer[] | Answer | undefined;
}

export type QuestionSerializable = {
  type: QUESTION_TYPE;
  questionText: string;
  timeLimit?: number;
  answers: AnswerSerializable[];
};

export type QUESTION_TYPE =
  | "CHOICE_SINGLE"
  | "CHOICE_MULTIPLE"
  | "BOOLEAN"
  | "ESTIMATE_FLOAT"
  | "ESTIMATE_INT"
  | "TEXT_GUESS";
