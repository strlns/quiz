import { Dispatch } from "react";
import { GameAction } from "../../models/Game";
import { SaveIcon } from "../Icons/Icons";
import Navigation from "./Navigation";
import styles from "../../styles/quiz/ControlsBar.module.css";
import boxStyles from "../../styles/UtilityStyles.module.css";
import btnStyles from "../../styles/Button.module.css";
import clsx from "clsx";

export type ControlsBarProps = {
  isFinished: boolean;
  numberOfCorrectAnswers: number;
  dispatchGameAction: Dispatch<GameAction>;
  currentQuestionIndex: number;
  numberOfTotalQuestions: number;
  hasAnswer: boolean;
  isLast: boolean;
  isFirst: boolean;
};

const ControlsBar = ({
  isFinished,
  numberOfCorrectAnswers,
  dispatchGameAction,
  currentQuestionIndex,
  numberOfTotalQuestions,
  hasAnswer,
  isFirst,
  isLast,
}: ControlsBarProps) => {
  return (
    <div className={styles.topBar}>
      <button
        className={clsx(btnStyles.button, btnStyles.disabled)}
        title="Save game state"
      >
        <SaveIcon />
      </button>
      {isFinished ? (
        <h3 style={{ fontSize: ".75rem", textAlign: "center" }}>
          Finished.
          <br />
          {numberOfCorrectAnswers} / {numberOfTotalQuestions}
        </h3>
      ) : null}
      <Navigation
        next={() =>
          dispatchGameAction({
            type: "NEXT",
          })
        }
        prev={() =>
          dispatchGameAction({
            type: "PREV",
          })
        }
        hasNext={hasAnswer && !isLast}
        hasPrev={!isFirst}
      />
      <span className={boxStyles.whitespaceNowrap}>
        {currentQuestionIndex + 1} / {numberOfTotalQuestions}
      </span>
    </div>
  );
};

export default ControlsBar;
