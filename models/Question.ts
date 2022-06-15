import { Answer } from "./Answer";
import { difference } from "lodash-es";

export interface Question {
  type: QUESTION_TYPE;
  questionText: string;
  timeLimit?: number;
  answers: Answer[];
}

export type Solution = number[];

export const isCorrect = (
  selectedSolution: Solution,
  question: Question
): boolean => {
  console.log(selectedSolution);
  return (
    //todo: rewrite this part
    selectedSolution.length ===
      question.answers.filter((a) => a.isSolution).length &&
    selectedSolution.every((index) => question.answers[index].isSolution)
  );
};

export type QUESTION_TYPE =
  | "CHOICE_SINGLE"
  | "CHOICE_MULTIPLE"
  | "BOOLEAN"
  | "ESTIMATE_FLOAT"
  | "ESTIMATE_INT"
  | "TEXT_GUESS";

export const isQuestion = (data: any): data is Question => {
  const mandatoryProperties = ["type", "questionText", "answers"];
  const properties = [...mandatoryProperties, "timeLimit"];
  return (
    Boolean(data) &&
    Array.isArray(data.answers) &&
    difference(mandatoryProperties, Object.keys(data)).length === 0 &&
    difference(Object.keys(data), properties).length === 0
  );
};
