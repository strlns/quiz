import React from "react";
import styles from "../styles/LayoutDefault.module.css";
import NavigationBar from "../components/NavigationBar";
import Head from "next/head";
import { useSession } from "next-auth/react";

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

const DefaultLayout: React.FC<LayoutProps> = ({ children, title }) => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Head>
          <title>{title ?? "Next test"}</title>
          <meta name="robots" content="noindex" />
        </Head>
        <div className={styles.app}>
          <NavigationBar className={styles.nav} session={session} />
          <main className={styles.main}>{children}</main>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Please sign in first</title>
          <meta name="robots" content="noindex" />
        </Head>
        <div className={styles.app}>
          <NavigationBar className={styles.nav} session={session} />
          <main className={styles.main}>
            <h1>Not signed in</h1>
          </main>
        </div>
      </>
    );
  }
};

export default DefaultLayout;
