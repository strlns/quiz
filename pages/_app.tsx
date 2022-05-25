import "../styles/globals.css";
import ProtectedPage from "../layouts/ProtectedPage";
import React, { Component } from "react";
import { SessionProvider } from "next-auth/react";
import { Page } from "../next-types/Page";
import { AppProps } from "next/app";

export type QuizAppProps = AppProps & {
  Component: Page;
  pageProps: any;
};

function QuizApp({
  Component,
  pageProps: { session, ...pageProps },
}: QuizAppProps) {
  const Layout = Component.layout ?? ProtectedPage;
  const layoutProps = {
    title: Component.title ?? "Next quiz app",
  };
  return (
    <SessionProvider session={session}>
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default QuizApp;
