import "../styles/globals.css";
import type { AppProps } from "next/app";
import DefaultLayout from "../layouts/default";
import React, { Component } from "react";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";

export type Page = NextPage & {
  layout?: React.FC<any>;
  title?: string;
};

type QuizAppProps = AppProps & {
  Component: Page;
  pageProps: any;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: QuizAppProps) {
  const Layout = Component.layout ?? DefaultLayout;
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

export default MyApp;
