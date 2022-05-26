import styles from "../styles/QuizGame.module.css";
import btnStyles from "../styles/Button.module.css";
import boxStyles from "../styles/BoxUtility.module.css";
import Question from "./Question/Question";
import { useEffect, useState } from "react";
import { Game } from "../models/Game";
import { Answer } from "../models/Answer";
import { SingleChoicePlaceholder } from "./Question/SingleChoice";

type QuizGameProps = {
  game: Game;
};

export const Skeleton = () => (
  <div>
    {[4, 2, 4, 4].map((k, i) => (
      <SingleChoicePlaceholder answers={k} key={i.toString()} />
    ))}
  </div>
);

const QuizGame = ({
  game: {
    quiz,
    currentQuestionIndex: initialQuestionIndex,
    answers: initialAnswers,
  },
}: QuizGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestionIndex);
  const [answers, setAnswers] = useState(initialAnswers);
  const [isFinished, setFinished] = useState(false);

  const updateAnswer = (answer: Answer, questionIndex: number) => {
    setAnswers((answers) => {
      const newAnswers = answers.slice();
      newAnswers[questionIndex] = answer;
      return newAnswers;
    });
    setFinished(questionIndex === quiz.questions.length - 1);
    if (questionIndex < quiz.questions.length - 1) {
      setCurrentQuestion(questionIndex + 1);
    }
  };

  const reset = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setFinished(false);
  };

  useEffect(() => {
    setAnswers([]);
    setCurrentQuestion(0);
    setFinished(false);
  }, [quiz]);

  const numberOfCorrectAnswers = answers.filter((a) => a?.isSolution).length;

  return (
    <div className={styles.quiz}>
      <div
        className={`${styles.questionContainer} ${
          isFinished ? styles.finished : ""
        }`}
      >
        <div className={styles.topBar}>
          <h3>
            {isFinished
              ? `${numberOfCorrectAnswers} / ${quiz.questions.length}`
              : null}
          </h3>
          <span>
            {currentQuestion + 1} / {quiz.questions.length}
          </span>
        </div>
        {quiz.questions.map((question, index) => (
          <Question
            key={index}
            question={question}
            active={index === currentQuestion}
            passed={index < currentQuestion || isFinished}
            selectedAnswer={answers[index]}
            setSelectedAnswer={(answer) => updateAnswer(answer, index)}
          />
        ))}
        {isFinished ? (
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
              {numberOfCorrectAnswers} of {quiz.questions.length} questions
              answered correctly.
            </p>
            <div
              className={boxStyles.boxBlockCenter}
              style={{ minHeight: "75%" }}
            >
              <button
                type="button"
                onClick={reset}
                className={btnStyles.bigButton}
              >
                Repeat
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default QuizGame;
