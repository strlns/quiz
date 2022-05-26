import {
  OpenTriviaResponse,
  OpenTriviaResponseWithShuffledAnswers,
  QuestionType,
} from "./OpenTriviaResponse";
import { Quiz } from "../Quiz";
import { BooleanQuestion } from "../BooleanQuestion";
import { SingleChoiceQuestion } from "../SingleChoiceQuestion";
import { Answer } from "../Answer";
import { shuffle } from "lodash-es";

export const toQuiz = (input: OpenTriviaResponseWithShuffledAnswers): Quiz => {
  const quiz = new Quiz();
  for (const inputQuestion of input.results) {
    switch (inputQuestion.type) {
      case QuestionType.Boolean: {
        const questionString = decodeSafeEntities(inputQuestion.question);
        const answers = inputQuestion.shuffled_answers.map(
          (answerText: string, index: number) =>
            new Answer(answerText, index === inputQuestion.correct_index)
        ) as [Answer, Answer];
        quiz.questions.push(new BooleanQuestion(questionString, answers));
        break;
      }
      case QuestionType.Multiple: {
        const convertedQuestion = new SingleChoiceQuestion(
          decodeSafeEntities(inputQuestion.question),
          inputQuestion.shuffled_answers.map((answer, index) => {
            return new Answer(
              decodeSafeEntities(answer),
              inputQuestion.correct_index === index
            );
          })
        );
        quiz.questions.push(convertedQuestion);
        break;
      }
    }
  }
  return quiz;
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
