import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { getSaveGamePayload, getSaveGameWithNewQuizIdPayload } from "../pages/api/game/updateOrCreate";
import { Game, isGame, isGameFromPersistedQuiz } from "../models/Game";
import { Quiz } from "../models/Quiz";
export type UseGamePersistenceReturnType = [boolean, () => Promise<void>, string[], Dispatch<void>];

const useGamePersistence = (
  game: Game
): UseGamePersistenceReturnType => {
  const [persisting, setPersisting] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const persistQuiz = async (quiz: Quiz): Promise<string|undefined> => {
    const response = await fetch("/api/quiz/create", {
      method: "POST",
      body: JSON.stringify(game.quiz),
    });
    
    if (response.status === 200) {
      const id = (await response.json()).id;
      if (id) {
        return id;
      }
    }
    else {
      const error = (await response.json())?.error;
      if (error) {
        setErrorMessages(msgs => [...msgs, error]);
      }
      else {
        throw new Error();
      }
      return;
    }
  }

  const persistGameToDatabase = async () => {
    if (sessionStatus !== "authenticated") {
      await signIn();
    }
    if (!game || !session?.user?.email) {
      return;
    }
    const handleErrorUnsafe = async (response: Response) => {
        const message = `Status ${response.status} ${response.statusText}
        ${await response.text()}`;
        setErrorMessages(msgs => [...msgs, message]);
    }
    setPersisting(true);
    if (isGameFromPersistedQuiz(game)) {
      const response = await fetch("/api/game/updateOrCreate", {
        method: "POST",
        body: JSON.stringify(getSaveGamePayload(game)),
      });
      if (response.status === 200) {
        const id = (await response.json()).id;
        if (id) {
          await router.push(`/game/play/${id}`);
        }
      }
      else {
        handleErrorUnsafe(response);
      }
    }
    else if (isGame(game)) {
        const quizID = await persistQuiz(game.quiz);
      if (quizID) {
        const response = await fetch("/api/game/updateOrCreate", {
          method: "POST",
          body: JSON.stringify(getSaveGameWithNewQuizIdPayload(game, quizID)),
        });
        if (response.status === 200) {
          const id = (await response.json()).id;
          if (id) {
            await router.push(`/game/play/${id}`);
          }
        }
        else {
          handleErrorUnsafe(response);
        }
      }
    }
    setPersisting(false);
  };
  const dismissErrors = () => {
    setErrorMessages([])
  }
  return [persisting, persistGameToDatabase, errorMessages, dismissErrors];
};

export default useGamePersistence;

