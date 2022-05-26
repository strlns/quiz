import { SingleChoiceQuestion } from "../../models/SingleChoiceQuestion";
import styles from "../../styles/Question.module.css";
import loadingStyles from "../../styles/LoadingIndicator.module.css";
import { answerClassName, QuestionProps } from "./Question";

interface SingleChoiceProps extends QuestionProps {
  question: SingleChoiceQuestion;
}

const SingleChoice = ({
  question,
  selectedAnswer,
  setSelectedAnswer,
  passed,
}: SingleChoiceProps) => {
  return (
    <div className={styles.question}>
      <h3 className={styles.questionText}>{question.questionText}</h3>
      {question.answers.map((answer) => (
        <div
          key={answer.answerText}
          className={answerClassName(answer, passed, selectedAnswer === answer)}
          onClick={() => setSelectedAnswer(answer)}
        >
          {answer.answerText}
        </div>
      ))}
    </div>
  );
};

export default SingleChoice;

type SingleChoicePlaceholderProps = {
  answers?: number;
};

export const SingleChoicePlaceholder = ({
  answers = 4,
}: SingleChoicePlaceholderProps) => {
  return (
    <div className={styles.question}>
      <h3 className={styles.questionText}></h3>
      {Array(answers)
        .fill(0)
        .map((z, i) => (
          <div
            key={i.toString()}
            className={`${styles.answer} ${loadingStyles.loading}`}
          ></div>
        ))}
    </div>
  );
};
