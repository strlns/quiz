import styles from "../../styles/quiz/QuizGame.module.css";
import boxStyles from "../../styles/UtilityStyles.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Dispatch } from "react";

type FinishedProps = {
  numberOfCorrectAnswers: number;
  numberOfQuestions: number;
  reset: Dispatch<void>;
};

const Finished = ({
  numberOfCorrectAnswers,
  numberOfQuestions,
  reset,
}: FinishedProps) => {
  return (
    <div className={styles.result}>
      <h1
        style={{
          fontSize: "2rem",
          padding: "4rem",
          textAlign: "center",
        }}
      >
        Finished
      </h1>
      <p>
        {numberOfCorrectAnswers} of {numberOfQuestions} questions answered
        correctly.
      </p>
      <div className={boxStyles.boxBlockCenter} style={{ minHeight: "75%" }}>
        <button
          type="button"
          onClick={() => reset()}
          className={btnStyles.bigButton}
        >
          Repeat
        </button>
      </div>
    </div>
  );
};
export default Finished;
