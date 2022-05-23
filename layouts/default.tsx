import React from "react";
import styles from '../styles/LayoutDefault.module.css';

const DefaultLayout: React.FC<any> = ({children}) => {
    return (
        <>
            <main className={styles.main}>
                {children}
            </main>
        </>
    );
}

export default DefaultLayout;