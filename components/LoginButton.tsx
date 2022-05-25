import React from "react";
import btnStyles from "../styles/Button.module.css";
import { signIn, signOut } from "next-auth/react";

type LoginButtonProps = {
  className?: string;
  isSignedIn: boolean;
};

const LoginButton = ({
  isSignedIn,
  className: outerClassName,
}: LoginButtonProps) => {
  const className = outerClassName ?? btnStyles.button;
  const onClick: React.MouseEventHandler = async (event) => {
    event.preventDefault();
    if (isSignedIn) {
      await signOut();
    } else {
      await signIn();
    }
  };

  if (isSignedIn) {
    return (
      // eslint-disable-next-line @next/next/no-html-link-for-pages
      <a href="/api/auth/signout" className={className} onClick={onClick}>
        Sign out
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    );
  } else {
    return (
      // eslint-disable-next-line @next/next/no-html-link-for-pages
      <a href="/api/auth/signin" className={className} onClick={onClick}>
        Sign in
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    );
  }
};

export default LoginButton;
