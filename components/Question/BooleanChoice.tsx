import styles from "../../styles/Question.module.css";
import { BooleanQuestion } from "../../models/BooleanQuestion";
import { answerClassName, QuestionProps } from "./Question";

interface BooleanQuestionProps extends QuestionProps {
  question: BooleanQuestion;
}

const BooleanChoice = ({
  question,
  selectedAnswer,
  setSelectedAnswer,
  passed,
}: BooleanQuestionProps) => {
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

export default BooleanChoice;
