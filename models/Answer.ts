import { Question } from "./Question";
import { difference } from "lodash-es";

export type Answer = {
  answerText: string;
  isSolution: boolean;
};

export const isAnswer = (data: any): data is Question => {
  const mandatoryProperties = ["answerText", "isSolution"];
  return (
    Boolean(data) &&
    difference(mandatoryProperties, Object.keys(data)).length === 0 &&
    difference(Object.keys(data), mandatoryProperties).length === 0
  );
};
