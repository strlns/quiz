import styles from "../../../styles/quiz/Question.module.css";
import { BooleanQuestion } from "../../../models/BooleanQuestion";
import { answerClassName, QuestionProps } from "./Question";
import { selectedAnswerSingleIndex } from "../../../models/Question";

interface BooleanQuestionProps extends QuestionProps {
  question: BooleanQuestion;
}

const BooleanChoice = ({
  question,
  selectedAnswers,
  setSelectedAnswers,
  passed,
}: BooleanQuestionProps) => {
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

export default BooleanChoice;
