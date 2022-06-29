import { useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { getSaveGamePayload } from "../pages/api/game/updateOrCreate";
import { GameFromPersisted } from "../models/Game";

const useGamePersistence = (
  game: GameFromPersisted
): [boolean, () => Promise<void>] => {
  const [persisting, setPersisting] = useState(false);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const persistGameToDatabase = async () => {
    if (sessionStatus !== "authenticated") {
      await signIn();
    }
    if (!game || !session?.user?.email) {
      return;
    }
    setPersisting(true);
    const response = await fetch("/api/game/updateOrCreate", {
      method: "POST",
      body: JSON.stringify(getSaveGamePayload(game)),
    });
    setPersisting(false);
    if (response.status === 200) {
      const id = (await response.json()).id;
      if (id) {
        await router.push(`/list/games`);
      }
    }
  };
  return [persisting, persistGameToDatabase];
};

export default useGamePersistence;
