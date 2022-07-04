import { getSession } from "next-auth/react";
import prisma from "../../../globals/db";
import { NextApiHandler } from "next";
import { GameAnswer, isChoicesGameAnswer } from "../../../models/GameAnswer";
import { difference, some } from "lodash-es";
import { fromPrisma, QuizPrismaGeneratedModelWithQuestionIDs, QuizWithAnswerIDsAndQuizID } from "../../../models/Quiz";
import {
  convertInGameAnswersToPersistentFormat,
  Game,
  GameFromPersistedQuiz,
} from "../../../models/Game";
import { Session } from "next-auth";
import { InGameGameAnswerToDoRemove } from "../../../models/Question";
import { isAnswerWithID } from "../../../models/Answer";
import { getQuiz } from "../../quiz/play/[id]";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session?.user?.id) {
    res.status(401);
    res.end();
    return;
  }
  

  const countOwnerGames = await prisma.game.count({
    where: {
      user: {
        id: {
          equals: session.user.id,
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

  let payload: unknown = JSON.parse(req.body);

  if (!isGameUpdatePayload(payload)) {
    res.status(400);
    return;
  }
  
  if (isGameFromNewQuizPayload(payload)) {
    
    const quiz = await getQuiz(payload.quizId);
    if (!quiz) {
      res.status(400);
      return;
    }
    const quizWithAnswerIDsAndQuizID = fromPrisma(quiz);
    const createGamePayload = getSaveGamePayload(
      {
        quiz: quizWithAnswerIDsAndQuizID,
        id: quizWithAnswerIDsAndQuizID.id,
        answers: payload.answers,
        currentQuestionIndex: payload.currentQuestionIndex
      }
    );
    payload = createGamePayload;
  }
  if (isGamePayload(payload)) {
    try {
      const createdGame = await createGame(payload, session);
      if (createdGame) {
        res.status(200).json({ id: createdGame.id });
      }
    }
    catch (e) {
      res.status(500);
    }
  }
};


class AuthError extends Error {};
class DataErrror extends Error {};

async function createGame(payload: GamePayload, session: Session) {
  if (!session?.user?.email) {
    throw new AuthError("could not create game, auth error.");
  }
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
    throw new DataErrror("could not create game, quiz not found");
  }
  return await prisma.game.create({
    data: {
      user: {
        connect: {
          id: session.user.id,
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
}

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

type GameFromNewQuizPayload = {
  quizId: string;
  currentQuestionIndex: number;
  answers: InGameGameAnswerToDoRemove[];
};

type GameAnswerPayload = {
  gameId: string;
  currentQuestionIndex: number;
  questionIndex?: number;
  answer?: GameAnswer;
};

export const getSaveGamePayload = (game: GameFromPersistedQuiz): GamePayload => {
  return {
    quizId: game.quiz.id,
    currentQuestionIndex: game.currentQuestionIndex,
    answers: convertInGameAnswersToPersistentFormat(game.answers, game.quiz),
  };
};

export const getSaveGameWithNewQuizIdPayload = (game: Game, quizID: string): GameFromNewQuizPayload => {
  return {
    quizId: quizID,
    currentQuestionIndex: game.currentQuestionIndex,
    answers: game.answers,
  };
};

const isGamePayload = (input: any): input is GamePayload => {
  return (
    isObject(input) &&
    Array.isArray(input.answers) &&
    input.answers.every((answer: any) => Array.isArray(answer.selectedAnswers) && isAnswerWithID(answer.selectedAnswers)),
    difference(Object.keys(input), [
      "quizId",
      "currentQuestionIndex",
      "answers",
    ]).length === 0
  );
};
const isGameFromNewQuizPayload = (input: any): input is GameFromNewQuizPayload => {
  return (
    isObject(input) &&
    Array.isArray(input.answers) &&
    !input.answers.some((answer: unknown) => isAnswerWithID(answer)) &&
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
