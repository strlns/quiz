import PublicPage from "../../layouts/PublicPage";
import { Page } from "../../next-types/Page";
import {
  fromPrisma,
  QuizPrismaGeneratedModelWithRelations,
} from "../../models/Quiz";
import prisma from "../../globals/db";
import { GetServerSideProps } from "next";
import QuizGame, { Skeleton } from "../../components/QuizGame";
import { useEffect, useReducer } from "react";
import { createNewGame, gameReducer } from "../../models/Game";

type PlayQuizProps = {
  quizFromDB: QuizPrismaGeneratedModelWithRelations;
};

const PlayQuiz: Page<PlayQuizProps> = ({ quizFromDB }) => {
  const [game, dispatchGameAction] = useReducer(
    gameReducer,
    createNewGame(fromPrisma(quizFromDB))
  );

  useEffect(() => {
    dispatchGameAction({
      type: "NEW",
      data: createNewGame(fromPrisma(quizFromDB)),
    });
  }, [quizFromDB]);

  return game ? (
    <>
      <h1>{game.quiz.title}</h1>
      <h2>By: {game.quiz.owner}</h2>
      {game ? (
        <QuizGame game={game} dispatchGameAction={dispatchGameAction} />
      ) : (
        <Skeleton />
      )}
    </>
  ) : (
    <Skeleton />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = String(context.query.id);
  const quiz = await prisma.quiz.findUnique({
    where: {
      id: query,
    },
    select: {
      id: true,
      title: true,
      owner: {
        select: {
          email: true,
        },
      },
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });

  return {
    props: {
      quizFromDB: quiz,
    },
  };
};

PlayQuiz.title = "Play Quiz";

PlayQuiz.layout = PublicPage;

export default PlayQuiz;
