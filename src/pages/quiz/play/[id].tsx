import PublicPage from "../../../layouts/PublicPage";
import { Page } from "../../../next-types/Page";
import {
  fromPrisma,
  QuizPrismaGeneratedModelWithRelations,
} from "../../../models/Quiz";
import { GetServerSideProps } from "next";
import QuizGame, { Skeleton } from "../../../components/Quiz/QuizGame";
import { useEffect, useReducer } from "react";
import {
  createNewGameFromPersistedQuiz,
  Game,
  GameFromPersistedQuiz,
  gameReducerWithInitialState,
  isGame,
} from "../../../models/Game";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useOnMount } from "../../../hooks/useOnMount";
import prisma from "../../../globals/db";
import btnStyles from "../../../styles/Button.module.css";
import { LoadSpinner } from "../../../components/LoadSpinner";
import useGamePersistence from "../../../hooks/useGamePersistence";

type PlayQuizProps = {
  quizFromDB: QuizPrismaGeneratedModelWithRelations;
};

const localStorageKey = (game: GameFromPersistedQuiz) =>
  `GAME-DEFAULT-QUIZ-${game.quiz.id}`;

const PlayQuiz: Page<PlayQuizProps> = ({ quizFromDB }) => {
  const [game, dispatchGameAction] = useReducer(
    gameReducerWithInitialState,
    createNewGameFromPersistedQuiz(fromPrisma(quizFromDB))
  );

  useEffect(() => {
    if (quizFromDB.id === game.quiz.id) {
      return;
    }
    dispatchGameAction({
      type: "NEW",
      data: createNewGameFromPersistedQuiz(fromPrisma(quizFromDB)),
    });
  }, [quizFromDB, game.quiz.id]);

  const [serializedGame, setSerializedGame] = useLocalStorage<Game>(
    localStorageKey(game),
    {
      quiz: game.quiz,
      currentQuestionIndex: 0,
      answers: [],
    }
  );

  const [isPersisting, persistGame] = useGamePersistence(game);

  useOnMount(() => {
    if (isGame(serializedGame)) {
      dispatchGameAction({ type: "NEW", data: serializedGame });
    }
  });

  useEffect(() => {
    setSerializedGame(game);
  }, [game, setSerializedGame]);

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

export const getQuiz = async (
  id: string
): Promise<QuizPrismaGeneratedModelWithRelations | null> => {
  return await prisma.quiz.findUnique({
    where: {
      id,
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
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = String(context.query.id);
  const quiz = await getQuiz(query);
  if (!quiz) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      quizFromDB: quiz,
    },
  };
};

PlayQuiz.title = "Play Quiz";

PlayQuiz.layout = PublicPage;

export default PlayQuiz;
