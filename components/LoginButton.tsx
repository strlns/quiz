import React from "react";
import btnStyles from "../styles/Button.module.css";
import { SessionContextValue, signIn, signOut } from "next-auth/react";
import { SignInIcon, SignOutIcon } from "./Icons/Icons";
import { LoadSpinner } from "./LoadSpinner";

type LoginButtonProps = {
  className?: string;
  sessionContext?: SessionContextValue;
};

const LoginButton = ({
  sessionContext,
  className: outerClassName,
}: LoginButtonProps) => {
  const className = outerClassName ?? btnStyles.button;
  const isLoadingOrServer =
    !sessionContext || sessionContext.status === "loading";
  const isAuthenticated =
    sessionContext && sessionContext.status === "authenticated";

  const url = isAuthenticated ? "/api/auth/signout" : "/api/auth/signin";
  const icon = isAuthenticated ? <SignOutIcon /> : <SignInIcon />;

  const onClick: React.MouseEventHandler = async (event) => {
    event.preventDefault();
    if (isLoadingOrServer) {
      return;
    }
    if (isAuthenticated) {
      await signOut();
    } else {
      await signIn();
    }
  };

  return isLoadingOrServer ? (
    <LoadSpinner />
  ) : (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a href={url} className={className} onClick={onClick}>
      Sign {isAuthenticated ? "out" : "in"}
      {icon}
    </a>
  );
};

export default LoginButton;
