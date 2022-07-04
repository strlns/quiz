import { GameAction } from "../../models/Game";
import { MaximizeIcon, MinimizeIcon, SaveIcon } from "../UserInterface/Icons";
import Navigation from "./Navigation";
import styles from "../../styles/quiz/ControlsBar.module.css";
import boxStyles from "../../styles/UtilityStyles.module.css";
import btnStyles from "../../styles/Button.module.css";
import clsx from "clsx";
import { LoadSpinner } from "../LoadSpinner";
import {
  Dispatch,
  MutableRefObject,
  RefObject,
  useEffect,
  useState,
} from "react";

export type ControlsBarProps = {
  isFinished: boolean;
  numberOfCorrectAnswers: number;
  dispatchGameAction: Dispatch<GameAction>;
  currentQuestionIndex: number;
  numberOfTotalQuestions: number;
  hasAnswer: boolean;
  isLast: boolean;
  isFirst: boolean;
  isPersisting: boolean;
  persist: () => void;
  quizElementRef: RefObject<HTMLElement>;
};

type RequestFullScreenButtonProps = {
  fullScreenElementRef: RefObject<HTMLElement>;
};

const RequestFullScreenButton = ({
  fullScreenElementRef,
}: RequestFullScreenButtonProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = async (): Promise<void> => {
    if (
      fullScreenElementRef.current &&
      document.fullscreenElement === fullScreenElementRef.current
    ) {
      try {
        await document.exitFullscreen();
        setIsFullScreen(false);
      } catch {}
    } else if (!document.fullscreenElement) {
      try {
        await fullScreenElementRef.current?.requestFullscreen();
        setIsFullScreen(true);
      } catch {
        setIsFullScreen(false);
      }
    }
  };
  useEffect(() => {
    const listener = () => {
      setIsFullScreen(
        Boolean(document.fullscreenElement) &&
          document.fullscreenElement === fullScreenElementRef.current
      );
    };
    document.addEventListener("fullscreenchange", listener);
    return () => document.removeEventListener("fullscreenchange", listener);
  }, [fullScreenElementRef]);

  return (
    <button onClick={toggleFullScreen} className={btnStyles.button}>
      {isFullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
    </button>
  );
};

const ControlsBar = ({
  isFinished,
  isPersisting,
  persist,
  dispatchGameAction,
  currentQuestionIndex,
  numberOfTotalQuestions,
  hasAnswer,
  isFirst,
  isLast,
  quizElementRef,
}: ControlsBarProps) => {
  return (
    <div className={styles.topBar}>
      <RequestFullScreenButton fullScreenElementRef={quizElementRef} />
      <button
        className={clsx(btnStyles.button)}
        title="Save game state"
        onClick={persist}
        disabled={isPersisting}
      >
        {isPersisting ? <LoadSpinner /> : <SaveIcon />}
      </button>
      {isFinished ? <h3>Finished.</h3> : null}
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
    </div>
  );
};

export default ControlsBar;
