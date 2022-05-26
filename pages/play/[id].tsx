import PublicPage from "../../layouts/PublicPage";
import { Page } from "../../next-types/Page";
import { Quiz, QuizPrismaGeneratedModelWithRelations } from "../../models/Quiz";
import prisma from "../../globals/db";
import { GetServerSideProps } from "next";
import QuizGame, { Skeleton } from "../../components/QuizGame";
import { useEffect, useState } from "react";
import { Game } from "../../models/Game";

type PlayQuizProps = {
  quizFromDB: QuizPrismaGeneratedModelWithRelations;
};

const PlayQuiz: Page<PlayQuizProps> = ({ quizFromDB }) => {
  const [quiz, setQuiz] = useState(undefined as Quiz | undefined);
  const [game, setGame] = useState(undefined as Game | undefined);
  useEffect(() => {
    if (quiz) {
      setGame(new Game(quiz));
    }
  }, [quiz]);
  useEffect(() => {
    setQuiz(Quiz.fromPrisma(quizFromDB));
  }, [quizFromDB]);
  return game ? (
    <>
      <h1>{game.quiz.title}</h1>
      <h2>By: {game.quiz.owner}</h2>
      {game ? <QuizGame game={game} /> : <Skeleton />}
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
