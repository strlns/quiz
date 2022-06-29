import { GetServerSideProps } from "next";
import prisma from "../../../globals/db";
import {
  fromPrisma,
  GamePrismaGeneratedModelWithRelations,
  gamePrismaIncludeConfigurationDeepFull,
  gameReducerWithInitialState,
} from "../../../models/Game";
import { Page } from "../../../next-types/Page";
import { useReducer } from "react";
import { getSession } from "next-auth/react";
import ProtectedPage from "../../../layouts/ProtectedPage";
import QuizGame, { Skeleton } from "../../../components/QuizGame";
import { convertViewDate } from "../../../utility/addViewData";

type ResumePersistedGameProps = {
  persistedGame: GamePrismaGeneratedModelWithRelations;
};

const ResumePersistedGame: Page<ResumePersistedGameProps> = ({
  persistedGame,
}) => {
  const [game, dispatchGameAction] = useReducer(
    gameReducerWithInitialState,
    fromPrisma(persistedGame)
  );
  return (
    <>
      <h1>{game.quiz.title}</h1>
      <h2>By: {game.quiz.owner}</h2>
      {game ? (
        <QuizGame game={game} dispatchGameAction={dispatchGameAction} />
      ) : (
        <Skeleton />
      )}
    </>
  );
};

ResumePersistedGame.layout = ProtectedPage;

export default ResumePersistedGame;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = String(context.query.id);
  const session = await getSession({ req: context.req });
  let game, authorized;
  if (id) {
    game = await prisma.game.findUnique({
      ...gamePrismaIncludeConfigurationDeepFull,
      where: {
        id,
      },
    });
  }
  if (game) {
    authorized = game?.user.email === session?.user?.email;
  }
  if (!game || !authorized) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      persistedGame: {
        ...convertViewDate(game),
        quiz: convertViewDate(game.quiz),
      },
      session,
    },
  };
};
