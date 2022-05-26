import React from "react";
import styles from "../styles/layouts/CommonLayoutStyles.module.css";
import NavigationBar from "../components/NavigationBar";
import Head from "next/head";
import { useSession } from "next-auth/react";
import LoginButton from "../components/LoginButton";
import { LayoutProps } from "../next-types/LayoutProps";

const ProtectedPage: React.FC<LayoutProps> = ({ children, title }) => {
  const sessionContext = useSession();
  if (sessionContext.status === "authenticated") {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="robots" content="noindex" />
        </Head>
        <div className={styles.app}>
          <NavigationBar
            className={styles.nav}
            sessionContext={sessionContext}
          />
          <main className={styles.main}>{children}</main>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>
            {sessionContext.status === "loading" ? "" : "Sign In | "}
            {title}
          </title>
          <meta name="robots" content="noindex" />
        </Head>
        <div className={styles.app}>
          <NavigationBar
            className={styles.nav}
            sessionContext={sessionContext}
          />
          <main className={`${styles.main} ${styles.mainFlex}`}>
            <h1>Sign in</h1>
            <div className={styles.centered}>
              {sessionContext.status === "loading" ? (
                "Loading..."
              ) : (
                <>
                  <p>Please sign in to visit this page.</p>
                  <LoginButton sessionContext={sessionContext} />
                </>
              )}
            </div>
          </main>
        </div>
      </>
    );
  }
};

export default ProtectedPage;
