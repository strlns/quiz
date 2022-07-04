import { SingleChoiceQuestion } from "../../../models/SingleChoiceQuestion";
import styles from "../../../styles/quiz/Question.module.css";
import loadingStyles from "../../../styles/LoadingIndicator.module.css";
import { answerClassName, QuestionProps } from "./Question";
import { selectedAnswerSingleIndex } from "../../../models/Question";

interface SingleChoiceProps extends QuestionProps {
  question: SingleChoiceQuestion;
}

const SingleChoice = ({
  question,
  selectedAnswers,
  setSelectedAnswers,
  passed,
}: SingleChoiceProps) => {
  const selectedAnswer = selectedAnswerSingleIndex(selectedAnswers);
  return (
    <div className={styles.question}>
      <h3 className={styles.questionText}>{question.questionText}</h3>
      {question.answers.map((answer, index) => (
        <div
          key={answer.answerText}
          className={answerClassName(answer, passed, selectedAnswer === index)}
          onClick={() => setSelectedAnswers([index])}
        >
          <span className={styles.answerText}>{answer.answerText}</span>
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
