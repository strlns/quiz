import { isCorrect, Question, Solution } from "../../../models/Question";
import React, { Dispatch } from "react";
import SingleChoice from "./SingleChoice";
import { SingleChoiceQuestion } from "../../../models/SingleChoiceQuestion";
import BooleanChoice from "./BooleanChoice";
import { BooleanQuestion } from "../../../models/BooleanQuestion";
import quizStyles from "../../../styles/QuizGame.module.css";
import styles from "../../../styles/Question.module.css";
import boxStyles from "../../../styles/UtilityStyles.module.css";
import { Answer } from "../../../models/Answer";
import clsx from "clsx";

export type QuestionProps = {
  question: Question;
  selectedAnswers: Solution;
  setSelectedAnswers: Dispatch<Solution>;
  passed: boolean;
};

const Question = ({
  question,
  selectedAnswers,
  setSelectedAnswers,
  passed,
}: QuestionProps) => {
  console.log(selectedAnswers);
  const correct = passed && isCorrect(selectedAnswers, question);
  return (
    <div
      className={clsx({
        [quizStyles.questionWrap]: true,
        [styles.disabled]: passed,
        [boxStyles.flexGrow]: true,
      })}
    >
      <ComponentForQuestionType
        question={question}
        selectedAnswers={selectedAnswers}
        setSelectedAnswers={setSelectedAnswers}
        passed={passed}
      />
      {passed && (
        <strong
          className={clsx(styles.passedAnswerResult, {
            [styles.passedAnswerResultCorrect]: correct,
          })}
        >
          {correct ? "Richtig!" : "Falsch."}
        </strong>
      )}
    </div>
  );
};

function ComponentForQuestionType(props: QuestionProps) {
  switch (props.question.type) {
    case "CHOICE_SINGLE":
      return (
        <SingleChoice
          {...props}
          question={props.question as SingleChoiceQuestion}
        />
      );
    case "BOOLEAN":
      return (
        <BooleanChoice
          {...props}
          question={props.question as BooleanQuestion}
        />
      );
  }
  return <div></div>;
}

export default Question;

export const answerClassName = (
  answer: Answer,
  passed: boolean,
  selected: boolean
): string =>
  clsx(styles.answer, {
    [styles.selectedAnswer]: selected,
    [styles.correct]: passed && answer.isSolution && selected,
    [styles.showCorrect]: passed && answer.isSolution && !selected,
    [styles.incorrect]: passed && !answer.isSolution && selected,
  });
