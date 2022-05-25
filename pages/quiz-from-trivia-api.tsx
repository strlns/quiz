import { Page } from "./_app";
import Head from "next/head";
import PublicPage from "../layouts/PublicPage";

const QuizFromTriviaApi: Page = () => {
  return (
    <>
      <Head>
        <title>Take a quiz using questions from Open Trivia DB</title>
      </Head>
      <h1>Demo trivia quiz</h1>
    </>
  );
};

QuizFromTriviaApi.layout = PublicPage;

export default QuizFromTriviaApi;
