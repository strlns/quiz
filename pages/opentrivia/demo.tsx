import Head from "next/head";
import PublicPage from "../../layouts/PublicPage";

import {
  OpenTriviaResponse,
  OpenTriviaResponseWithShuffledAnswers,
} from "../../models/external/OpenTriviaResponse";
import { Page } from "../../next-types/Page";
import {
  shuffleAnswers,
  toQuiz,
} from "../../models/external/OpenTriviaResponseConverter";
import QuizGame, { Skeleton } from "../../components/QuizGame";
import { FormEventHandler, useEffect, useReducer, useState } from "react";

import OpenTriviaApiForm from "../../components/OpenTriviaDemo/Form";
import { useRouter } from "next/router";
import { useOnMount } from "../../hooks/useOnMount";
import { useSimpleErrorMessage } from "../../hooks/useSimpleErrorMessage";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import demoQuiz from "../../data/opentrivia/demoQuiz.json";
import { LoadSpinner } from "../../components/LoadSpinner";
import { signIn, useSession } from "next-auth/react";
import btnStyles from "../../styles/Button.module.css";
import boxStyles from "../../styles/UtilityStyles.module.css";
import { Quiz } from "../../models/Quiz";
import { Game, createNewGame, gameReducer, isGame } from "../../models/Game";
import { GetStaticProps } from "next";
import LoadingIndicator from "../../components/LoadingIndicator";

const LOCALSTORAGE_KEY_QUIZ = "opentrivia_quiz";

type QuizFromTriviaApiProps = {
  demo: Quiz;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      demo: toQuiz(shuffleAnswers(demoQuiz as OpenTriviaResponse)),
    },
  };
};

const limitNumber = (input: number) => {
  if (isNaN(input)) return 10;
  if (input < 1) return 1;
  if (input > 100) return 100;
  return Math.floor(input);
};

const parseNumberFromRoute = (
  numStr: string | string[] | undefined
): number => {
  return limitNumber(Number(numStr));
};

const NewOpenTriviaQuiz: Page<QuizFromTriviaApiProps> = ({ demo }) => {
  const [game, dispatchGameAction] = useReducer(
    gameReducer,
    undefined as Game | undefined
  );

  const [serializedGame, setSerializedGame] = useLocalStorage<Game>(
    LOCALSTORAGE_KEY_QUIZ,
    {
      quiz: demo,
      currentQuestionIndex: 0,
      answers: [],
    }
  );

  const [fetching, setFetching] = useState(false);
  const [persisting, setPersisting] = useState(false);
  const [error, addError, clearError] = useSimpleErrorMessage();
  const router = useRouter();

  const { data: session, status: sessionStatus } = useSession();

  //called on server side too, route parsing is in useOnMount
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  const loadNewQuiz = async () => {
    const data = await fetchData();
    if (data) {
      dispatchGameAction({ type: "NEW", data: createNewGame(toQuiz(data)) });
    }
  };

  useEffect(() => {
    if (game) {
      setSerializedGame(game);
    }
  }, [game, setSerializedGame]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const { numberOfQuestions: initialNumberOfQuestions } = router.query;
    setNumberOfQuestions(parseNumberFromRoute(initialNumberOfQuestions));
  }, [router.isReady, router.query]);

  useOnMount(() => {
    if (isGame(serializedGame)) {
      console.log(serializedGame);
      dispatchGameAction({ type: "NEW", data: serializedGame });
    } else {
      void loadNewQuiz();
    }
  });

  const fetchData = async (): Promise<
    OpenTriviaResponseWithShuffledAnswers | undefined
  > => {
    try {
      setFetching(true);
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${Number(numberOfQuestions)}`
      );
      const json = (await response.json()) as OpenTriviaResponse;
      if (json.response_code === 0) {
        clearError();
        return shuffleAnswers(json);
      } else {
        addError();
      }
    } catch (e) {
      addError(e instanceof Error ? e.message : "Fetch failed");
    } finally {
      setFetching(false);
    }
  };

  const onSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    await router.push(
      `${router.basePath}?numberOfQuestions=${numberOfQuestions}`,
      undefined,
      {
        shallow: true,
      }
    );
    await loadNewQuiz();
  };

  const persistQuizToDatabase = async () => {
    if (sessionStatus !== "authenticated") {
      await signIn();
    }
    if (!game || !session?.user?.email) {
      return;
    }
    setPersisting(true);
    const response = await fetch("/api/quiz/create", {
      method: "POST",
      body: JSON.stringify(game.quiz),
    });
    setPersisting(false);
    if (response.status === 200) {
      const id = (await response.json()).id;
      if (id) {
        await router.push(`/play/${id}`);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Fetched Quiz from Open Trivia DB</title>
      </Head>
      <h1>Demo trivia quiz</h1>
      <div className={boxStyles.boxes} style={{ marginBottom: "1rem" }}>
        <LoadingIndicator
          waitFor={!fetching}
          minHeight="3rem"
          placeholder={<LoadSpinner />}
        >
          <OpenTriviaApiForm
            numberOfQuestions={numberOfQuestions}
            onChangeNumberOfQuestions={(num) =>
              setNumberOfQuestions(limitNumber(num))
            }
            onSubmit={onSubmit}
          />
          <div className={boxStyles.boxLast}>
            <button
              className={btnStyles.button}
              onClick={persistQuizToDatabase}
            >
              Persist to DB
              {persisting ? <LoadSpinner /> : null}
            </button>
          </div>
        </LoadingIndicator>
      </div>
      {error ? <p>{error}</p> : null}
      {game ? (
        <QuizGame game={game} dispatchGameAction={dispatchGameAction} />
      ) : (
        <Skeleton />
      )}
    </>
  );
};

NewOpenTriviaQuiz.layout = PublicPage;

export default NewOpenTriviaQuiz;
