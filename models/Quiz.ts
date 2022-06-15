import { isQuestion, Question } from "./Question";
import { shuffle } from "lodash-es";
import { Prisma, Quiz as QuizPrisma } from "@prisma/client";
import { isAnswer } from "./Answer";

export type QuizPrismaGeneratedModel = QuizPrisma;

export type QuizPrismaGeneratedModelWithRelations = Prisma.QuizGetPayload<{
  include: {
    owner: {
      select: {
        email: true;
      };
    };
    questions: {
      include: {
        answers: true;
      };
    };
  };
}>;

export const DEFAULT_TITLE = "Untitled Quiz";

export type Quiz = {
  title: string;
  owner: string;
  id?: string;
  questions: Question[];
};

export function fromPrisma(
  dbResult: QuizPrismaGeneratedModelWithRelations
): Quiz {
  return {
    title: dbResult.title,
    owner: dbResult.owner?.email ?? "",
    questions: dbResult.questions.map(({ type, questionText, answers }) => ({
      type,
      questionText,
      answers: answers.map(({ answerText, isSolution }) => ({
        answerText,
        isSolution,
      })),
    })),
  };
}

/**
 Don't use this in code that runs on both the server and the client,
 it would lead to hydration errors.
 */
export function shuffleAnswers(quiz: Quiz): Quiz {
  const result = structuredClone(quiz);
  for (const question of result.questions) {
    question.answers = shuffle(question.answers);
  }
  return result;
}

export interface QuizListData
  extends Omit<Partial<QuizPrisma>, "updatedAt" | "createdAt"> {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    questions: number;
  };
}

export interface QuizListDataWithDateAsString
  extends Omit<Partial<QuizPrisma>, "updatedAt" | "createdAt"> {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    questions: number;
  };
}

export const withViewDate = (
  q: QuizListData
): QuizListDataWithDateAsString => ({
  ...q,
  createdAt: q.createdAt.toUTCString(),
  updatedAt: q.updatedAt.toUTCString(),
});

/*
 * This should probably use something like a generated JSON schema
 */
export const isQuiz = (data: any): data is Quiz => {
  let valid = Boolean(data) && typeof data === "object";
  valid = valid && data.questions && Array.isArray(data.questions);
  valid =
    valid &&
    data.questions.every(
      (questionData: any) =>
        isQuestion(questionData) &&
        questionData.answers.every((answerData) => isAnswer(answerData))
    );

  valid = valid && data.questions.length <= 100;
  valid =
    valid &&
    data.questions.every((question: Question) => question.answers.length <= 8);
  return valid;
};
