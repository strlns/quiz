import { Question } from "../../models/Question";
import React, { Dispatch, ReactComponentElement } from "react";
import SingleChoice from "./SingleChoice";
import { SingleChoiceQuestion } from "../../models/SingleChoiceQuestion";
import BooleanChoice from "./BooleanChoice";
import { BooleanQuestion } from "../../models/BooleanQuestion";
import quizStyles from "../../styles/QuizGame.module.css";
import styles from "../../styles/Question.module.css";
import { Answer } from "../../models/Answer";

export interface QuestionProps {
  question: Question;
  active: Boolean;
  selectedAnswer?: Answer;
  setSelectedAnswer: Dispatch<Answer>;
  passed: boolean;
}

const Question = ({
  question,
  active,
  selectedAnswer,
  setSelectedAnswer,
  passed,
}: QuestionProps): ReactComponentElement<any> => {
  const className = `${quizStyles.question} ${
    active ? quizStyles.active : ""
  } ${passed ? quizStyles.before : ""}`;
  return (
    <div className={className}>
      <ComponentForQuestionType
        question={question}
        active={active}
        passed={passed}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
    </div>
  );
};

function ComponentForQuestionType({
  question,
  active,
  selectedAnswer,
  setSelectedAnswer,
  passed,
}: QuestionProps) {
  switch (question.type) {
    case "CHOICE_SINGLE":
      return (
        <SingleChoice
          passed={passed}
          active={active}
          question={question as SingleChoiceQuestion}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
        />
      );
    case "BOOLEAN":
      return (
        <BooleanChoice
          passed={passed}
          active={active}
          question={question as BooleanQuestion}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
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
  `${styles.answer}${selected ? ` ${styles.selectedAnswer}` : ""}${
    passed && answer.isSolution && selected ? ` ${styles.correct}` : ""
  }${passed && !answer.isSolution && selected ? ` ${styles.incorrect}` : ""}`;
