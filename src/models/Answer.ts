import { Question } from "./Question";
import { difference } from "lodash-es";

export interface Answer {
  id?: string;
  answerText: string;
  isSolution: boolean;
}

export interface AnswerWithID extends Answer {
  id: string;
}

export const isAnswer = (data: any): data is Question => {
  const mandatoryProperties = ["answerText", "isSolution"];
  const properties = [...mandatoryProperties, "id"];
  return (
    Boolean(data) &&
    difference(mandatoryProperties, Object.keys(data)).length === 0 &&
    difference(Object.keys(data), properties).length === 0
  );
};

export const isAnswerWithID = (data: any): data is AnswerWithID => typeof data.id === 'string' && isAnswer(data);