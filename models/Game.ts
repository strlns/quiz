import { isQuiz, Quiz } from "./Quiz";
import { Solution } from "./Question";

type GameAnswers = Solution[];

export interface Game {
  quiz: Quiz;
  answers: GameAnswers;
  currentQuestionIndex: number;
}

export const createNewGame = (quiz: Quiz): Game => ({
  quiz,
  currentQuestionIndex: 0,
  answers: [],
});

// export type GameActionType = "ANSWER" | "NEXT" | "PREV" | "RESET";
export type GameAction =
  | { type: "ANSWER"; data: { answer: Solution; index: number } }
  | {
      type: "NEXT";
    }
  | { type: "PREV" }
  | { type: "RESET" }
  | { type: "NEW"; data: Game };

export const gameReducer = (
  state: Game | undefined,
  action: GameAction
): Game | undefined => {
  if (action.type === "NEW") {
    return action.data;
  }
  if (!state) {
    return;
  }
  switch (action.type) {
    case "ANSWER":
      console.log(action, state.answers);
      return {
        ...state,
        answers: [
          ...state.answers.slice(0, action.data.index),
          action.data.answer,
          ...state.answers.slice(action.data.index + 1),
        ],
      };
    case "NEXT":
      if (state.currentQuestionIndex >= state.quiz.questions.length - 1) {
        return state;
      }
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
    case "PREV":
      if (state.currentQuestionIndex === 0) {
        return state;
      }
      return { ...state, currentQuestionIndex: state.currentQuestionIndex - 1 };
    case "RESET":
      return createNewGame(state.quiz);
  }
};

export const isGame = (data: any): data is Game => {
  return (
    Boolean(data) &&
    isQuiz(data.quiz) &&
    typeof data.currentQuestionIndex === "number" &&
    Array.isArray(data.answers) &&
    data.answers.every(
      (a: unknown) =>
        (Array.isArray(a) && a.every((a) => typeof a === "number")) ||
        a === undefined
    )
  );
};
