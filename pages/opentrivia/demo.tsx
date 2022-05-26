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
import { FormEventHandler, useEffect, useState } from "react";

import OpenTriviaApiForm from "../../components/OpenTriviaDemo/Form";
import { useRouter } from "next/router";
import { useOnMount } from "../../hooks/useOnMount";
import { useSimpleErrorMessage } from "../../hooks/useSimpleErrorMessage";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import demoQuiz from "../../data/opentrivia/demoQuiz.json";
import { LoadSpinner } from "../../components/LoadSpinner";
import { signIn, useSession } from "next-auth/react";
import btnStyles from "../../styles/Button.module.css";
import boxStyles from "../../styles/BoxUtility.module.css";
import { Quiz } from "../../models/Quiz";
import { Game } from "../../models/Game";

const LOCALSTORAGE_KEY = "opentrivia_demo";

type QuizFromTriviaApiProps = {
  demo: OpenTriviaResponseWithShuffledAnswers;
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

const NewOpenTriviaQuiz: Page<QuizFromTriviaApiProps> = ({}) => {
  const [quiz, setQuiz] = useState(undefined as Quiz | undefined);
  const [game, setGame] = useState(undefined as Game | undefined);
  const [serializedQuiz, setSerializedQuiz] = useLocalStorage<
    OpenTriviaResponseWithShuffledAnswers | undefined
  >(
    LOCALSTORAGE_KEY,
    shuffleAnswers(demoQuiz as OpenTriviaResponseWithShuffledAnswers)
  );
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [error, addError, clearError] = useSimpleErrorMessage();
  const router = useRouter();

  const { data: session, status: sessionStatus } = useSession();

  //called on server side too, route parsing is in useOnMount
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const { numberOfQuestions: initialNumberOfQuestions } = router.query;
    setNumberOfQuestions(parseNumberFromRoute(initialNumberOfQuestions));
  }, [router.isReady, router.query]);

  useEffect(() => {
    setLoading(sessionStatus === "loading" || fetching);
  }, [sessionStatus, router.isReady, fetching]);

  useOnMount(() => {
    if (serializedQuiz) {
      try {
        setQuiz(toQuiz(serializedQuiz));
      } catch {}
    } else {
      fetchData().then((quiz) => {
        setQuiz(quiz);
      });
    }
  });

  useEffect(() => {
    if (quiz) {
      const game = new Game(quiz);
      setGame(game);
    }
  }, [quiz]);

  const fetchData = async () => {
    try {
      setFetching(true);
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${Number(numberOfQuestions)}`
      );
      const json = (await response.json()) as OpenTriviaResponse;
      if (json.response_code === 0) {
        clearError();
        const quizData = shuffleAnswers(json);
        setSerializedQuiz(quizData);
        return toQuiz(quizData);
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
    setQuiz(undefined);
    await router.push(
      `${router.basePath}?numberOfQuestions=${numberOfQuestions}`,
      undefined,
      {
        shallow: true,
      }
    );
    setQuiz(await fetchData());
  };

  const [persisting, setPersisting] = useState(false);
  const persistQuiz = async () => {
    if (sessionStatus !== "authenticated") {
      await signIn();
    }
    if (!quiz || !session?.user?.email) {
      return;
    }
    setPersisting(true);
    const data = quiz.serialize();
    const response = await fetch("/api/quiz/create", {
      method: "POST",
      body: data,
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
      <LoadingIndicator
        waitFor={!loading}
        minHeight="3rem"
        placeholder={<LoadSpinner />}
      >
        <div className={boxStyles.boxes} style={{ marginBottom: "1rem" }}>
          <OpenTriviaApiForm
            numberOfQuestions={numberOfQuestions}
            onChangeNumberOfQuestions={(num) =>
              setNumberOfQuestions(limitNumber(num))
            }
            onSubmit={onSubmit}
          />
          <div className={boxStyles.boxLast}>
            <button className={btnStyles.button} onClick={persistQuiz}>
              Persist to DB
              {persisting ? <LoadSpinner /> : null}
            </button>
          </div>
        </div>
      </LoadingIndicator>
      {error ? <p>{error}</p> : null}
      {game ? <QuizGame game={game} /> : <Skeleton />}
    </>
  );
};

NewOpenTriviaQuiz.layout = PublicPage;

export default NewOpenTriviaQuiz;
