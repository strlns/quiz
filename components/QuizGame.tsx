import styles from "../styles/QuizGame.module.css";
import boxStyles from "../styles/UtilityStyles.module.css";
import Question from "./Quiz/Question/Question";
import { Dispatch } from "react";
import { Game, GameAction } from "../models/Game";
import { SingleChoicePlaceholder } from "./Quiz/Question/SingleChoice";
import QuestionPlaceholder from "./Quiz/Question/QuestionPlaceholder";
import Finished from "./Quiz/Finished";
import Navigation from "./Quiz/Navigation";
import clsx from "clsx";
import { isCorrect } from "../models/Question";

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

const QuizGame = ({
  game: { answers, quiz, currentQuestionIndex },
  dispatchGameAction,
}: QuizGameProps) => {
  const isFinished =
    answers.length === quiz.questions.length &&
    answers.every((answer) => answer !== undefined);
  const numberOfCorrectAnswers = answers.filter((a, index) =>
    isCorrect(a, quiz.questions[index])
  ).length;
  const question = quiz.questions[currentQuestionIndex];
  const answer = answers[currentQuestionIndex];
  const hasAnswer = answer !== undefined;
  const isLast = currentQuestionIndex >= quiz.questions.length - 1;
  const isFirst = currentQuestionIndex === 0;

  return (
    <div
      className={clsx(
        styles.quiz,
        boxStyles.flexGrow,
        boxStyles.flex,
        boxStyles.flexCol
      )}
    >
      <div className={styles.topBar}>
        <h3>
          {isFinished
            ? `${numberOfCorrectAnswers} / ${quiz.questions.length}`
            : null}
        </h3>
        <span>
          {currentQuestionIndex + 1} / {quiz.questions.length}
        </span>
      </div>
      <div
        className={clsx(
          styles.quizInner,
          isFinished && styles.finished,
          boxStyles.flexGrow,
          boxStyles.flex,
          boxStyles.flexCol,
          boxStyles.justifyEvenly,
          boxStyles.itemsCenter
        )}
      >
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
        <div
          className={clsx(
            styles.bottomBar,
            boxStyles.flex,
            boxStyles.justifyCenter,
            boxStyles.itemsEnd
          )}
        >
          {isFinished ? (
            <Finished
              numberOfQuestions={quiz.questions.length}
              numberOfCorrectAnswers={numberOfCorrectAnswers}
              reset={() =>
                dispatchGameAction({
                  type: "RESET",
                })
              }
            />
          ) : (
            <Navigation
              next={
                isLast
                  ? undefined
                  : () =>
                      dispatchGameAction({
                        type: "NEXT",
                      })
              }
              prev={
                isFirst
                  ? undefined
                  : () =>
                      dispatchGameAction({
                        type: "PREV",
                      })
              }
              nextDisabled={!hasAnswer}
              prevDisabled={isFirst}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
