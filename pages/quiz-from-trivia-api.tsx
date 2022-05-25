import Head from "next/head";
import PublicPage from "../layouts/PublicPage";
import demoQuiz from "../data/opentrivia/demoQuiz.json";

import { GetStaticProps } from "next";
import { OpenTriviaResponse } from "../models/external/OpenTriviaResponse";
import { Page } from "../next-types/Page";
import { toQuiz } from "../models/external/OpenTriviaResponseConverter";

type QuizFromTriviaApiProps = {
  demo: OpenTriviaResponse;
};

const QuizFromTriviaApi: Page<QuizFromTriviaApiProps> = (
  props: QuizFromTriviaApiProps
) => {
  const quiz = toQuiz(props.demo);
  return (
    <>
      <Head>
        <title>Take a quiz using questions from Open Trivia DB</title>
      </Head>
      <h1>Demo trivia quiz</h1>
      <pre>{JSON.stringify(quiz, null, 2)}</pre>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      demo: demoQuiz as OpenTriviaResponse,
    },
  };
};

QuizFromTriviaApi.layout = PublicPage;

export default QuizFromTriviaApi;
