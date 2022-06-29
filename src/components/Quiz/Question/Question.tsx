import { InGameGameAnswerToDoRemove, Question } from "../../../models/Question";
import React, { Dispatch } from "react";
import SingleChoice from "./SingleChoice";
import { SingleChoiceQuestion } from "../../../models/SingleChoiceQuestion";
import BooleanChoice from "./BooleanChoice";
import { BooleanQuestion } from "../../../models/BooleanQuestion";
import quizStyles from "../../../styles/quiz/QuizGame.module.css";
import styles from "../../../styles/quiz/Question.module.css";
import boxStyles from "../../../styles/UtilityStyles.module.css";
import { Answer } from "../../../models/Answer";
import clsx from "clsx";

export type QuestionProps = {
  question: Question;
  selectedAnswers: InGameGameAnswerToDoRemove;
  setSelectedAnswers: Dispatch<InGameGameAnswerToDoRemove>;
  passed: boolean;
};

const Question = ({
  question,
  selectedAnswers,
  setSelectedAnswers,
  passed,
}: QuestionProps) => {
  return (
    <div
      className={clsx(
        styles.questionWrap,
        boxStyles.flex,
        boxStyles.flexCol,
        boxStyles.justifyCenter,
        {
          [styles.disabled]: passed,
        }
      )}
    >
      <ComponentForQuestionType
        question={question}
        selectedAnswers={selectedAnswers}
        setSelectedAnswers={setSelectedAnswers}
        passed={passed}
      />
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
