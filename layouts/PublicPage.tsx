import React from "react";
import styles from "../styles/layouts/CommonLayoutStyles.module.css";
import NavigationBar from "../components/NavigationBar";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { LayoutProps } from "../next-types/LayoutProps";
import clsx from "clsx";

const PublicPage: React.FC<LayoutProps> = ({ children, title }) => {
  const sessionContext = useSession();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={styles.app}>
        <NavigationBar className={styles.nav} sessionContext={sessionContext} />
        <main className={clsx(styles.main, styles.mainFlex)}>{children}</main>
      </div>
    </>
  );
};

export default PublicPage;
