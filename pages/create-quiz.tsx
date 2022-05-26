import ProtectedPage from "../layouts/ProtectedPage";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Page } from "../next-types/Page";

const CreateQuiz: Page = () => {
  return (
    <>
      <h1>Create a quiz</h1>
      <p>Nothing here yet</p>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

CreateQuiz.layout = ProtectedPage;

export default CreateQuiz;
