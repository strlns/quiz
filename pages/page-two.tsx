import { Page } from "./_app";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

const PageTwo: Page = () => {
  return (
    <>
      <Head>
        <title>This should override the title property</title>
      </Head>
      Test routing with custom server
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

PageTwo.title = "The second page.";

export default PageTwo;
