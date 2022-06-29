import boxStyles from "../../styles/UtilityStyles.module.css";
import styles from "../../styles/quiz/QuestionNavigation.module.css";
import btnStyles from "../../styles/Button.module.css";
import React, { Dispatch } from "react";
import { ArrowLeft, ArrowRight } from "../Icons/Icons";
import clsx from "clsx";

type NavigationProps = {
  next: Dispatch<void>;
  prev: Dispatch<void>;
  hasNext: boolean;
  hasPrev: boolean;
};

const ButtonPlaceholder = () => (
  <button
    disabled
    className={btnStyles.button}
    style={{
      background: "none",
      border: "none",
      boxShadow: "none",
      outline: "none",
    }}
  >
    <span
      style={{
        minWidth: "var(--icon-size)",
        display: "inline-block",
      }}
    ></span>
  </button>
);

const QuestionNavigation = ({
  next,
  prev,
  hasNext,
  hasPrev,
}: NavigationProps) => {
  return (
    <div className={clsx(styles.navWrap)}>
      <nav
        className={clsx(
          styles.nav,
          boxStyles.flexGrow,
          boxStyles.flex,
          boxStyles.justifyBetween
        )}
      >
        {hasPrev ? (
          <button
            type="button"
            onClick={() => prev()}
            title={"Go back"}
            className={btnStyles.button}
          >
            <ArrowLeft />
          </button>
        ) : (
          <ButtonPlaceholder />
        )}
        {hasNext ? (
          <button
            type="button"
            onClick={() => next()}
            className={btnStyles.button}
            title={"Go forward"}
          >
            <ArrowRight />
          </button>
        ) : (
          <ButtonPlaceholder />
        )}
      </nav>
    </div>
  );
};
export default QuestionNavigation;
