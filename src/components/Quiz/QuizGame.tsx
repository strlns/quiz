import styles from "../../styles/quiz/QuizGame.module.css";
import boxStyles from "../../styles/UtilityStyles.module.css";
import Question from "./Question/Question";
import { CSSProperties, Dispatch, useEffect, useRef } from "react";
import { Game, GameAction, getComputedGameState } from "../../models/Game";
import { SingleChoicePlaceholder } from "./Question/SingleChoice";
import QuestionPlaceholder from "./Question/QuestionPlaceholder";
import clsx from "clsx";
import AnsweredQuestionResult from "./AnsweredQuestionResult";
import ControlsBar from "./ControlsBar";
import { ArrowRight, CheckIcon } from "../UserInterface/Icons";
import useGamePersistence from "../../hooks/useGamePersistence";
import PersistenceErrors from "./PersistenceErrors";

type QuizGameProps = {
  game: Game;
  dispatchGameAction: Dispatch<GameAction>;
};

export const Skeleton = () => (
  <div>
    {[4, 2, 4, 4].map((k, i) => (
      <SingleChoicePlaceholder answers={k} key={i.toString()} />
    ))}
  </div>
);

const QuizGame = ({ game, dispatchGameAction }: QuizGameProps) => {
  const quizElement = useRef<HTMLDivElement>(null);
  const scrollIntoView = () => quizElement.current?.scrollIntoView();
  const {
    answers,
    quiz,
    isCorrectAnswer,
    isFinished,
    numberOfCorrectAnswers,
    numberOfTotalQuestions,
    currentQuestionIndex,
    hasAnswer,
    isFirst,
    isLast,
    question,
  } = getComputedGameState(game);
  useEffect(() => {
    const el = quizElement.current;
    if (!el) return;
    let clicked: Date | null = null;
    const listener = () => {
      if (!clicked || Number(new Date()) - Number(clicked) > 10000) {
        scrollIntoView();
      }
      clicked = new Date();
    };
    const remove = () => {
      clearTimeout(timeout);
      el.removeEventListener("click", listener);
    };
    el.addEventListener("click", listener);
    const timeout = setTimeout(() => {
      if (!clicked) scrollIntoView();
    }, 3500);
    return remove;
  }, [quiz]);

  const [
    isPersisting,
    persistGame,
    persistenceErrors,
    dismissPersistenceErrors,
  ] = useGamePersistence(game);

  return (
    <div
      className={clsx(
        styles.quiz,
        boxStyles.flexGrow,
        boxStyles.flex,
        boxStyles.flexCol
      )}
      ref={quizElement}
    >
      <ControlsBar
        dispatchGameAction={dispatchGameAction}
        isFinished={isFinished}
        numberOfCorrectAnswers={numberOfCorrectAnswers}
        currentQuestionIndex={currentQuestionIndex}
        numberOfTotalQuestions={numberOfTotalQuestions}
        hasAnswer={hasAnswer}
        isLast={isLast}
        isFirst={isFirst}
        isPersisting={isPersisting}
        persist={persistGame}
        quizElementRef={quizElement}
      />
      <PersistenceErrors
        errors={persistenceErrors}
        dismissErrors={dismissPersistenceErrors}
      />

      <span className={clsx(boxStyles.whitespaceNowrap, styles.questionNumber)}>
        {currentQuestionIndex + 1} / {numberOfTotalQuestions}
      </span>
      <div className={clsx(styles.quizInner, isFinished && styles.finished)}>
        {question ? (
          <Question
            question={question}
            selectedAnswers={answers[currentQuestionIndex] ?? []}
            setSelectedAnswers={(answer) =>
              dispatchGameAction({
                type: "ANSWER",
                data: {
                  answer,
                  index: currentQuestionIndex,
                },
              })
            }
            passed={hasAnswer}
          />
        ) : (
          <QuestionPlaceholder />
        )}
        {hasAnswer && (
          <div
            className={clsx(
              boxStyles.flex,
              boxStyles.gap,
              boxStyles.justifyEvenly,
              boxStyles.itemsCenter
            )}
            style={{ minWidth: "var(--question-width)" }}
          >
            <AnsweredQuestionResult isCorrect={isCorrectAnswer} />
            {!isLast && (
              <button
                style={{ "--icon-size": "2rem" } as CSSProperties}
                onClick={() => dispatchGameAction({ type: "NEXT" })}
              >
                <ArrowRight />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGame;
