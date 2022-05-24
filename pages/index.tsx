import DefaultLayout from "../layouts/default";
import { Page } from "./_app";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

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

Home.layout = DefaultLayout;

export default Home;
