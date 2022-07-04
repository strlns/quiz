import React from "react";
import { SessionContextValue, signIn, signOut } from "next-auth/react";
import { SignInIcon, SignOutIcon } from "./UserInterface/Icons";
import { LoadSpinner } from "./LoadSpinner";

type LoginLogoutButtonProps = {
  className?: string;
  sessionContext?: SessionContextValue;
};

const LoginLogoutButton = ({
  sessionContext,
  className,
}: LoginLogoutButtonProps) => {
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

export default LoginLogoutButton;
