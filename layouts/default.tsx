import React from "react";
import styles from '../styles/LayoutDefault.module.css';
import NavigationBar from "../components/NavigationBar";
import Head from "next/head";

type LayoutProps = {
    children?: React.ReactNode
    title?: string
}

const DefaultLayout: React.FC<LayoutProps> = (
    {
        children,
        title
}) => {
    return (
        <>
            <Head>
                <title>{title ?? 'Next test'}</title>
              <meta name='robots' content='noindex'/>
            </Head>
            <div className={styles.app}>
                <NavigationBar className={styles.nav} />
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </>
    );
}

export default DefaultLayout;