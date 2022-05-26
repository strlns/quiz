import { Question, QuestionSerializable } from "./Question";
import { shuffle } from "lodash-es";
import { Prisma, Quiz as QuizPrisma } from "@prisma/client";
import { BooleanQuestion } from "./BooleanQuestion";
import { Answer } from "./Answer";
import { SingleChoiceQuestion } from "./SingleChoiceQuestion";

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

export class Quiz {
  title: string;
  owner: string;
  prisma?: QuizPrisma;

  constructor(
    title?: string,
    owner?: string,
    questions?: Question[],
    prisma?: QuizPrisma
  ) {
    this.title = title ?? DEFAULT_TITLE;
    this.owner = owner ?? "";
    this.questions = questions ?? [];
    this.prisma = prisma;
  }

  questions: Question[] = [];

  /**
   Don't use this in code that runs on both the server and the client,
   it would lead to hydration errors.
   */
  shuffleAnswers(): void {
    for (const question of this.questions) {
      question.answers = shuffle(question.answers);
    }
  }

  serialize(): string {
    return JSON.stringify(this);
  }

  static fromPrisma(input: QuizPrismaGeneratedModelWithRelations): Quiz {
    const quiz = new Quiz(input.title);
    quiz.owner = input.owner?.email ?? "";
    quiz.questions = input.questions.map((question) => {
      switch (question.type) {
        case "BOOLEAN":
          return new BooleanQuestion(
            question.questionText,
            question.answers.map(
              (a) => new Answer(a.answerText, a.isSolution)
            ) as [Answer, Answer]
          );
        case "CHOICE_SINGLE":
          return new SingleChoiceQuestion(
            question.questionText,
            question.answers.map((a) => new Answer(a.answerText, a.isSolution))
          );
        default:
          throw new Error();
      }
    });
    return quiz;
  }
}

export interface QuizSerializable {
  title: string;
  questions: QuestionSerializable[];
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
