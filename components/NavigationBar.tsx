import Link from "next/link";
import styles from "../styles/NavigationBar.module.css";
import {FunctionComponent} from "react";

type NavigationBarProps = {
    className?: string
}

const NavigationBar: FunctionComponent<NavigationBarProps> = ({className: outerClassName}: NavigationBarProps) => {
    const className = `${styles.nav} ${(outerClassName ?? '')}`;
    return (
        <nav className={className}>
            <ul>
                <li>
                    <Link href='/'>
                        <a className={styles.item}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 20 20"
                                 fill="currentColor">
                                <title>Start</title>
                                <path
                                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                            </svg>
                            Start
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href='/page-two'>
                        <a className={styles.item}>
                            Page two
                        </a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavigationBar;