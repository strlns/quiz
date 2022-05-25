import React from "react";
import styles from "../styles/layouts/CommonLayoutStyles.module.css";
import NavigationBar from "../components/NavigationBar";
import Head from "next/head";
import { useSession } from "next-auth/react";
import LoginButton from "../components/LoginButton";

type LayoutProps = {
  children?: React.ReactNode;
  title: string;
};

const ProtectedPage: React.FC<LayoutProps> = ({ children, title }) => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Head>
          <title>{title}</title>
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
          <title>Sign In | {title}</title>
          <meta name="robots" content="noindex" />
        </Head>
        <div className={styles.app}>
          <NavigationBar className={styles.nav} session={session} />
          <main className={`${styles.main} ${styles.mainFlex}`}>
            <h1>Sign in</h1>
            <div className={styles.centered}>
              <p>Please sign in to visit this page.</p>
              <LoginButton isSignedIn={false} />
            </div>
          </main>
        </div>
      </>
    );
  }
};

export default ProtectedPage;
