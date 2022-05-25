export interface Question {}

export type QUESTION_TYPE =
  | "CHOICE_SINGLE"
  | "CHOICE_MULTIPLE"
  | "BOOLEAN"
  | "ESTIMATE_FLOAT"
  | "ESTIMATE_INT"
  | "TEXT_GUESS";
