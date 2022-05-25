import { OpenTriviaResponse, QuestionType } from "./OpenTriviaResponse";
import { Quiz } from "../Quiz";
import { BooleanQuestion } from "../BooleanQuestion";
import { SingleChoiceQuestion } from "../SingleChoiceQuestion";
import { Answer } from "../Answer";

export const toQuiz = (input: OpenTriviaResponse): Quiz => {
  const quiz = new Quiz();
  for (const inputQuestion of input.results) {
    switch (inputQuestion.type) {
      case QuestionType.Boolean: {
        const convertedQuestion = new BooleanQuestion(
          inputQuestion.question,
          convertBoolean(inputQuestion.correct_answer)
        );
        quiz.questions.push(convertedQuestion);
        break;
      }
      case QuestionType.Multiple: {
        const convertedQuestion = new SingleChoiceQuestion(
          inputQuestion.question
        );
        const answers = [];
        for (const answer of inputQuestion.incorrect_answers) {
          answers.push(new Answer(answer, false));
        }
        answers.push(new Answer(inputQuestion.correct_answer, true));
        convertedQuestion.answers = answers;
        quiz.questions.push(convertedQuestion);
        break;
      }
    }
  }
  return quiz;
};

const convertBoolean = (input: unknown) => {
  return Boolean(String(input).match(/^true$/i));
};
