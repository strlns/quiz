import { AnswerWithID } from "./Answer";
import { QUESTION_TYPE } from "./Question";
import { Prisma } from "@prisma/client";

type QUESTION_TYPE_CHOICES = Extract<
  QUESTION_TYPE,
  "BOOLEAN" | "CHOICE_SINGLE" | "CHOICE_MULTIPLE"
>;

type QUESTION_TYPE_NUMERIC = Extract<
  QUESTION_TYPE,
  "ESTIMATE_INT" | "ESTIMATE_FLOAT"
>;

type QUESTION_TYPE_TEXT = Extract<QUESTION_TYPE, "TEXT_GUESS">;

export type GameAnswer = GameAnswerChoices | GameAnswerNumeric | GameAnswerText;

export type GameAnswerChoices = {
  questionType: QUESTION_TYPE_CHOICES;
  selectedAnswers: AnswerWithID[];
};
export type GameAnswerNumeric = {
  questionType: QUESTION_TYPE_NUMERIC;
  answerText: number;
};
export type GameAnswerText = {
  questionType: QUESTION_TYPE_TEXT;
  answerText: string;
};

export type PrismaGameAnswerWithRelevantRelations =
  Prisma.GameAnswerGetPayload<{
    include: {
      question: {
        select: {
          id: true;
          type: true;
        };
      };
      selectedAnswers: {
        include: {
          answer: {
            select: {
              id: true;
            };
          };
        };
      };
    };
  }>;

// const mapDbGameAnswersToQuizAnswers = (
//   input: PrismaGameAnswerWithRelevantRelations,
//   quiz: QuizWithAnswerIDsAndQuizID
// ): AnswerWithID[] => {
//   const answerMap = new Map<string, AnswerWithID>();
//   for (const question of quiz.questions) {
//     for (const answer of question.answers) {
//       answerMap.set(answer.id, answer);
//     }
//   }
//   return input.selectedAnswers.map((dbSelectedAnswer) => {
//     const answer = answerMap.get(dbSelectedAnswer.answerId);
//     if (!answer) {
//       throw new Error();
//     }
//     return answer;
//   });
// };
//
// const fromPrisma = (
//   input: PrismaGameAnswerWithRelevantRelations,
//   quiz: QuizWithAnswerIDsAndQuizID
// ): GameAnswer => {
//   if (isChoicesQuestionType(input.question.type)) {
//     return {
//       questionType: input.question.type,
//       selectedAnswers: mapDbGameAnswersToQuizAnswers(input, quiz),
//     };
//   } else if (isNumericQuestionType(input.question.type)) {
//     return {
//       questionType: input.question.type,
//       answerText:
//         input.question.type === "ESTIMATE_FLOAT"
//           ? parseFloat(String(input.answerText))
//           : parseInt(String(input.answerText), 10),
//     };
//   } else if (isFreeTextQuestionType(input.question.type)) {
//     return {
//       questionType: input.question.type,
//       answerText: String(input.answerText),
//     };
//   }
//   throw new Error("Error reading game answer from DB.");
// };

export const isFreeTextQuestionType = (
  questionType: QUESTION_TYPE
): questionType is QUESTION_TYPE_TEXT => {
  switch (questionType) {
    case "TEXT_GUESS":
      return true;
    default:
      return false;
  }
};

export const isChoicesQuestionType = (
  questionType: QUESTION_TYPE
): questionType is QUESTION_TYPE_CHOICES => {
  switch (questionType) {
    case "CHOICE_SINGLE":
    case "CHOICE_MULTIPLE":
    case "BOOLEAN":
      return true;
    default:
      return false;
  }
};

export const isNumericQuestionType = (
  questionType: QUESTION_TYPE
): questionType is QUESTION_TYPE_NUMERIC => {
  switch (questionType) {
    case "ESTIMATE_INT":
    case "ESTIMATE_FLOAT":
      return true;
    default:
      return false;
  }
};

export const isNumericGameAnswer = (
  answer: GameAnswer
): answer is GameAnswerNumeric => isNumericQuestionType(answer.questionType);
export const isChoicesGameAnswer = (
  answer: GameAnswer
): answer is GameAnswerChoices => isChoicesQuestionType(answer.questionType);
export const isTextGameAnswer = (
  answer: GameAnswer
): answer is GameAnswerText => isFreeTextQuestionType(answer.questionType);
