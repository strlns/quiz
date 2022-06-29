import { getSession } from "next-auth/react";
import prisma from "../../../globals/db";
import { NextApiHandler } from "next";
import { GameAnswer, isChoicesGameAnswer } from "../../../models/GameAnswer";
import { difference } from "lodash-es";
import { QuizPrismaGeneratedModelWithQuestionIDs } from "../../../models/Quiz";
import {
  convertInGameAnswersToPersistentFormat,
  GameFromPersisted,
} from "../../../models/Game";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session?.user?.email) {
    res.status(401);
    res.end();
    return;
  }

  const countOwnerGames = await prisma.game.count({
    where: {
      user: {
        email: {
          equals: session.user.email,
        },
      },
    },
  });

  if (countOwnerGames > 9) {
    res.status(403).json({
      error: "You are not allowed to persist more than 10 games.",
    });
    return;
  }

  const payload: unknown = JSON.parse(req.body);
  if (!isGameUpdatePayload(payload)) {
    res.status(400);
    return;
  }

  if (isGamePayload(payload)) {
    const quiz = await prisma.quiz.findUnique({
      where: { id: payload.quizId },
      include: {
        questions: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!quiz) {
      res.status(500);
      return;
    }
    const createdGame = await prisma.game.create({
      data: {
        user: {
          connect: {
            email: session.user.email,
          },
        },
        quiz: {
          connect: {
            id: quiz.id,
          },
        },
        currentQuestionIndex: payload.currentQuestionIndex,
        answers: {
          create: convertAnswers(payload.answers, quiz),
        },
      },
    });
    if (createdGame) {
      res.status(200).json({ id: createdGame.id });
    }
  }
};

const convertAnswers = (
  answers: GameAnswer[],
  quiz: QuizPrismaGeneratedModelWithQuestionIDs
) => {
  const gameAnswersInput = [];
  for (let i = 0; i < answers.length; i++) {
    gameAnswersInput.push(convertAnswerForDB(answers[i], quiz.questions[i].id));
  }
  return gameAnswersInput;
};

const convertAnswerForDB = (gameAnswer: GameAnswer, questionId: string) => {
  const res = {
    question: {
      connect: {
        id: questionId,
      },
    },
  };
  if (isChoicesGameAnswer(gameAnswer)) {
    return {
      ...res,
      selectedAnswers: {
        createMany: {
          data: gameAnswer.selectedAnswers.map((answerWithID) => {
            return {
              answerId: answerWithID.id,
            };
          }),
        },
      },
    };
  } else {
    return {
      ...res,
      answerText: String(gameAnswer.answerText),
    };
  }
};

type GameUpdatePayload = GamePayload | GameAnswerPayload;

type GamePayload = {
  quizId: string;
  currentQuestionIndex: number;
  answers: GameAnswer[];
};

type GameAnswerPayload = {
  gameId: string;
  currentQuestionIndex: number;
  questionIndex?: number;
  answer?: GameAnswer;
};

export const getSaveGamePayload = (game: GameFromPersisted): GamePayload => {
  return {
    quizId: game.quiz.id,
    currentQuestionIndex: game.currentQuestionIndex,
    answers: convertInGameAnswersToPersistentFormat(game.answers, game.quiz),
  };
};

const isGamePayload = (input: any): input is GamePayload => {
  return (
    isObject(input) &&
    Array.isArray(input.answers) &&
    difference(Object.keys(input), [
      "quizId",
      "currentQuestionIndex",
      "answers",
    ]).length === 0
  );
};

const isGameAnswerPayload = (input: any): input is GameAnswerPayload => {
  return (
    isObject(input) &&
    typeof input.currentQuestionIndex === "number" &&
    typeof input.questionIndex === "number" &&
    difference(Object.keys(input), [
      "quizId",
      "currentQuestionIndex",
      "questionIndex",
      "answer",
    ]).length === 0
  );
};

const isGameUpdatePayload = (input: any): input is GameUpdatePayload => {
  return isGameAnswerPayload(input) || isGamePayload(input);
};

const isObject = (input: any): boolean =>
  Boolean(input) && typeof input === "object";

export default handler;
