import '../styles/globals.css'
import type {AppProps} from 'next/app'
import DefaultLayout from "../layouts/default";
import React, {Component} from "react";
import {NextPage} from "next";

export type Page = NextPage & {
  layout?: React.FC<any>,
  title?: string
}

type QuizAppProps = AppProps & {
  Component: Page,
  pageProps: any
}

function MyApp({Component, pageProps}: QuizAppProps) {
  const Layout = Component.layout ?? DefaultLayout;
  const layoutProps = {
    title: Component.title ?? 'A new next subpage'
  };
  return (
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp
