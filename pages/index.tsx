import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Page } from "../next-types/Page";
import PublicPage from "../layouts/PublicPage";

const Home: Page = () => {
  return <h1>Hello World</h1>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

Home.layout = PublicPage;

export default Home;
