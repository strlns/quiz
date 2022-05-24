import { Session } from "next-auth";
import styles from "../styles/NavigationBar.module.css";
import { DefaultSession } from "next-auth";

type SessionIndicatorProps = {
  session: Session | null;
};

const iconUser = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={styles.icon}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

const iconHeart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={styles.icon}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
);

const iconLock = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={styles.icon}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
      clipRule="evenodd"
    />
  </svg>
);

const iconForUser = (user: DefaultSession["user"]) =>
  user
    ? String(user.email).toLowerCase().includes("kerss")
      ? iconHeart
      : iconUser
    : iconLock;

const SessionIndicator = ({ session }: SessionIndicatorProps) => {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
      {session ? (
        <>
          {iconForUser(session.user)}
          {session.user ? `${session.user.name ?? session.user.email}` : ""}
        </>
      ) : (
        <span>Not signed in</span>
      )}
    </span>
  );
};

export default SessionIndicator;
