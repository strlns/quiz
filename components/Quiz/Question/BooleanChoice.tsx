import styles from "../../../styles/Question.module.css";
import { BooleanQuestion } from "../../../models/BooleanQuestion";
import { answerClassName, QuestionProps } from "./Question";

interface BooleanQuestionProps extends QuestionProps {
  question: BooleanQuestion;
}

const BooleanChoice = ({
  question,
  selectedAnswers,
  setSelectedAnswers,
  passed,
}: BooleanQuestionProps) => {
  const selectedAnswer = selectedAnswers[0] ?? undefined;
  return (
    <div className={styles.question}>
      <h3 className={styles.questionText}>{question.questionText}</h3>
      {question.answers.map((answer, index) => (
        <div
          key={answer.answerText}
          className={answerClassName(answer, passed, selectedAnswer === index)}
          onClick={() => setSelectedAnswers([index])}
        >
          {answer.answerText}
        </div>
      ))}
    </div>
  );
};

export default BooleanChoice;
