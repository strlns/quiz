import '../styles/globals.css'
import type { AppProps } from 'next/app'
import DefaultLayout from "../layouts/default";
import React, {Component} from "react";
import {NextPage} from "next";

export type PageWithLayout = NextPage & {
  layout?: React.FC<any>
}

type QuizAppProps = AppProps & {
  Component: PageWithLayout,
  pageProps: any
}

function MyApp({ Component, pageProps }: QuizAppProps) {
  const Layout = Component.layout ?? DefaultLayout;
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp
