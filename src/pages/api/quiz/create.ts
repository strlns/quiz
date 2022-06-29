import { getSession } from "next-auth/react";
import { Prisma } from "@prisma/client";
import prisma from "../../../globals/db";
import { DEFAULT_TITLE, isQuiz } from "../../../models/Quiz";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session?.user?.email) {
    res.status(401);
    res.end();
    return;
  }

  const countOwnerQuizzes = await prisma.quiz.count({
    where: {
      owner: {
        email: {
          equals: session.user.email,
        },
      },
    },
  });

  if (countOwnerQuizzes > 9) {
    res.status(403).json({
      error: "You are not allowed to persist more than 10 quizzes.",
    });
    return;
  }

  const quizData: unknown = JSON.parse(req.body);
  if (!isQuiz(quizData)) {
    res.status(500).json({
      error: "Invalid data",
    });
    return;
  }

  if (quizData.title.length === 0) {
    quizData.title = DEFAULT_TITLE;
  }

  const owner: Prisma.UserCreateNestedOneWithoutQuizInput = {
    connect: {
      email: session.user.email,
    },
  };
  const quizCreate: Prisma.QuizCreateInput = {
    owner,
    title: quizData.title,
    questions: {
      create: quizData.questions.map((question) => ({
        questionText: question.questionText,
        answers: {
          create: question.answers,
        },
      })),
    },
  };
  const quiz = await prisma.quiz.create({
    data: quizCreate,
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });
  res.status(200).json({
    id: quiz.id,
  });
};

export default handler;
