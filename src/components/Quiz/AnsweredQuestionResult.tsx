import clsx from "clsx";
import styles from "../../styles/quiz/AnsweredQuestionResult.module.css";
import React from "react";

type AnsweredQuestionResultProps = {
  isCorrect: boolean;
};

const AnsweredQuestionResult = ({ isCorrect }: AnsweredQuestionResultProps) => {
  return (
    <strong
      className={clsx(styles.passedAnswerResult, {
        [styles.passedAnswerResultCorrect]: isCorrect,
      })}
    >
      {isCorrect ? "Correct!" : "Wrong."}
    </strong>
  );
};
export default AnsweredQuestionResult;
