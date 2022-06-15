import {
  OpenTriviaResponse,
  OpenTriviaResponseWithShuffledAnswers,
  QuestionType,
  ResultWithShuffledAnswers,
} from "./OpenTriviaResponse";
import { Quiz } from "../Quiz";
import { Answer } from "../Answer";
import { shuffle } from "lodash-es";
import { v4 as UUID } from "uuid";
import { Question } from "../Question";

const convertAnswer = (
  answerText: string,
  index: number,
  correct_index: number
): Answer => ({
  answerText: decodeSafeEntities(answerText),
  isSolution: index === correct_index,
});

export const toQuiz = (input: OpenTriviaResponseWithShuffledAnswers): Quiz => {
  const numberOfQuestions = input.results.length;
  const dateString = new Date().toISOString();
  const id = UUID();
  return {
    id,
    title: `OpenTrivia Quiz with ${numberOfQuestions} questions, ${dateString}`,
    questions: input.results.map((inputQuestion) =>
      convertQuestion(inputQuestion)
    ),
    owner: "",
  };
};

const convertQuestion = (
  inputQuestion: ResultWithShuffledAnswers
): Question => {
  switch (inputQuestion.type) {
    case QuestionType.Boolean: {
      return {
        type: "BOOLEAN",
        questionText: decodeSafeEntities(inputQuestion.question),
        answers: inputQuestion.shuffled_answers.map(
          (answerText: string, index: number) =>
            convertAnswer(answerText, index, inputQuestion.correct_index)
        ) as [Answer, Answer],
      };
    }
    case QuestionType.Multiple: {
      return {
        type: "CHOICE_SINGLE",
        questionText: decodeSafeEntities(inputQuestion.question),
        answers: inputQuestion.shuffled_answers.map(
          (answerText: string, index: number) =>
            convertAnswer(answerText, index, inputQuestion.correct_index)
        ) as Answer[],
      };
    }
  }
};

/**
 Don't use this in code that runs on both the server and the client,
 it would lead to hydration errors.
 */
export function shuffleAnswers(
  response: OpenTriviaResponse
): OpenTriviaResponseWithShuffledAnswers {
  const result = {
    response_code: response.response_code,
    results: [...response.results],
  } as OpenTriviaResponseWithShuffledAnswers;
  for (const question of result.results) {
    const correctAnswer = question.correct_answer;
    const source = [correctAnswer, ...question.incorrect_answers];
    const shuffled = shuffle(source);
    question.correct_index = shuffled.findIndex((el) => el === correctAnswer);
    question.shuffled_answers = shuffled;
  }
  return result;
}

const decodeSafeEntities = (str: string): string => {
  /*
  OpenTrivia response contains some special characters encoded as HTML entities,
  using this to avoid dangerouslySetInnerHTML or adding a library
  */
  return str
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&deg;", "°")
    .replaceAll("&amp;", "&")
    .replaceAll("&trade;", "™")
    .replaceAll("&reg;", "®")
    .replaceAll("&eacute;", "é")
    .replaceAll("&egrave;", "è")
    .replaceAll("&aacute;", "á")
    .replaceAll("&agrave;", "à")
    .replaceAll("&shy;", "\xAD");
};
