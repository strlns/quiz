import { Page } from "../../next-types/Page";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../globals/db";
import ProtectedPage from "../../layouts/ProtectedPage";
import { Game } from ".prisma/client";
import { convertViewDate } from "../../utility/addViewData";

type ListOwnGamesProps = {
  games: Game[];
};

const ListOwnGames: Page<ListOwnGamesProps> = ({
  games,
}: ListOwnGamesProps) => {
  return (
    <ul>
      {games.map((game) => (
        <li key={game.id}>
          <a href={`/play/game/${game.id}`}>{game.id}</a>
        </li>
      ))}
    </ul>
  );
};

ListOwnGames.layout = ProtectedPage;

export default ListOwnGames;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {
        session,
      },
    };
  }
  const games = await prisma.game.findMany({
    where: {
      user: session.user,
    },
    include: {
      quiz: {
        select: {
          title: true,
        },
      },
    },
  });
  return {
    props: {
      session,
      games: games.map((game) => convertViewDate(game)),
    },
  };
};
