import Link from "next/link";
import styles from "../styles/NavigationBar.module.css";
import btnStyles from "../styles/Button.module.css";
import { FunctionComponent } from "react";
import LoginButton from "./LoginButton";
import SessionIndicator from "./SessionIndicator";
import { SessionContextValue } from "next-auth/react";

type NavigationBarProps = {
  className?: string;
  sessionContext?: SessionContextValue;
};

const NavigationBar: FunctionComponent<NavigationBarProps> = ({
  className: outerClassName,
  sessionContext,
}: NavigationBarProps) => {
  const className = `${styles.nav} ${outerClassName ?? ""}`;
  return (
    <nav className={className}>
      <ul>
        <li>
          <Link href="/">
            <a className={btnStyles.button}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <title>Start</title>
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
          </Link>
        </li>
        <>
          <li>
            <Link href="/create-quiz">
              <a className={btnStyles.button}>Create quiz</a>
            </Link>
          </li>
        </>
        <li>
          <Link href="/opentrivia/demo">
            <a className={btnStyles.button}>Demo trivia quiz</a>
          </Link>
        </li>
        <li>
          <Link href="/list/mine">
            <a className={btnStyles.button}>Mine</a>
          </Link>
        </li>
      </ul>
      <ul className={styles.session}>
        <li>
          <SessionIndicator sessionContext={sessionContext} />
        </li>
        <li>
          <LoginButton
            className={btnStyles.button}
            sessionContext={sessionContext}
          />
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
