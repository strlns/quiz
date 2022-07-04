import { Session } from "next-auth";
import styles from "../styles/SessionIndicator.module.css";
import { SessionContextValue } from "next-auth/react";
import { HeartIcon, LockIcon, PersonIcon } from "./UserInterface/Icons";

type SessionIndicatorProps = {
  sessionContext?: SessionContextValue;
};

const iconForUser = (user: Session["user"]) =>
  user ? (
    String(user.email).toLowerCase().includes("kerss") ? (
      <HeartIcon />
    ) : (
      <PersonIcon />
    )
  ) : (
    <LockIcon />
  );

const SessionIndicator = ({ sessionContext }: SessionIndicatorProps) => {
  return (
    <span className={styles.text}>
      {sessionContext && sessionContext.status === "authenticated" ? (
        <>
          {iconForUser(sessionContext.data.user)}
          {sessionContext.data.user
            ? `${
                sessionContext.data.user.name ?? sessionContext.data.user.email
              }`
            : ""}
        </>
      ) : !sessionContext || sessionContext.status === "loading" ? (
        ""
      ) : (
        "Not signed in"
      )}
    </span>
  );
};

export default SessionIndicator;
