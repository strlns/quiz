import React from "react";
import styles from '../styles/LayoutDefault.module.css';
import NavigationBar from "../components/NavigationBar";

const DefaultLayout: React.FC<any> = ({children}) => {
    return (
        <div className={styles.app}>
            <NavigationBar className={styles.nav} />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}

export default DefaultLayout;