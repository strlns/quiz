import React from "react";
import styles from "../styles/layouts/CommonLayoutStyles.module.css";
import NavigationBar from "../components/NavigationBar";
import Head from "next/head";
import { useSession } from "next-auth/react";

type LayoutProps = {
  children?: React.ReactNode;
  title: string;
};

const PublicPage: React.FC<LayoutProps> = ({ children, title }) => {
  const { data: session } = useSession();
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
};

export default PublicPage;
