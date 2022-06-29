import { isQuiz, Quiz, QuizWithAnswerIDsAndQuizID } from "./Quiz";
import { InGameGameAnswerToDoRemove, isCorrect } from "./Question";
import { GameAnswerChoices, isChoicesQuestionType } from "./GameAnswer";
import { Prisma } from "@prisma/client";
import { fromPrisma as quizFromPrisma } from "./Quiz";

export interface Game {
  quiz: Quiz;
  answers: InGameGameAnswerToDoRemove[];
  currentQuestionIndex: number;
}

export interface GameFromPersisted extends Game {
  quiz: QuizWithAnswerIDsAndQuizID;
  id?: string;
}

export const createNewGameFromQuiz = (quiz: Quiz): Game => ({
  quiz,
  currentQuestionIndex: 0,
  answers: [],
});

export const createNewGameFromPersistedQuiz = (
  quiz: QuizWithAnswerIDsAndQuizID
): GameFromPersisted => ({
  quiz,
  currentQuestionIndex: 0,
  answers: [],
});

// export type GameActionType = "ANSWER" | "NEXT" | "PREV" | "RESET";
export type GameAction =
  | {
      type: "ANSWER";
      data: { answer: InGameGameAnswerToDoRemove; index: number };
    }
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
      return createNewGameFromQuiz(state.quiz);
  }
};

export const gameReducerWithInitialState = (
  state: GameFromPersisted,
  action: GameAction
): GameFromPersisted => {
  const game = gameReducer(state, action);
  if (!game) {
    throw new Error("Expected initial state for game");
  }
  return game as GameFromPersisted;
};

export const isGame = (data: any): data is Game => {
  return (
    Boolean(data) &&
    isQuiz(data.quiz) &&
    typeof data.currentQuestionIndex === "number" &&
    Array.isArray(data.answers)
  );
};

export const convertInGameAnswersToPersistentFormat = (
  answers: InGameGameAnswerToDoRemove[],
  quiz: QuizWithAnswerIDsAndQuizID
) => {
  const result: GameAnswerChoices[] = [];
  for (let i = 0; i < answers.length; i++) {
    const question = quiz.questions[i];
    if (!question || !isChoicesQuestionType(question.type)) {
      throw new Error(
        "Incompatible format, old in-game answers only work for choice questions"
      );
    }
    const selectedAnswers = answers[i] ?? [];
    result.push({
      questionType: question.type,
      selectedAnswers: selectedAnswers.map((index) => question.answers[index]),
    });
  }
  return result;
};

export const getComputedGameState = ({ answers, quiz, currentQuestionIndex }: Game) => {
  const isFinished =
    answers.length === quiz.questions.length &&
    answers.every((answer) => answer !== undefined);
  const numberOfCorrectAnswers = answers.filter((a, index) =>
    isCorrect(a, quiz.questions[index])
  ).length;
  const question = quiz.questions[currentQuestionIndex];
  const answer = answers[currentQuestionIndex];
  const hasAnswer = answer !== undefined;
  const isLast = currentQuestionIndex >= quiz.questions.length - 1;
  const isFirst = currentQuestionIndex === 0;
  const isCorrectAnswer = isCorrect(answer, question);
  const numberOfTotalQuestions = quiz.questions.length;
  return {
    currentQuestionIndex,
    quiz,
    answer,
    answers,
    hasAnswer,
    isCorrectAnswer,
    isFinished,
    isFirst,
    isLast,
    numberOfCorrectAnswers,
    numberOfTotalQuestions,
    question,
  };
};

export const gamePrismaIncludeConfigurationDeepFull = {
  include: {
    user: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },
    quiz: {
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    },
    answers: {
      include: {
        selectedAnswers: true,
      },
    },
  },
};

export type GamePrismaGeneratedModelWithRelations = Prisma.GameGetPayload<
  typeof gamePrismaIncludeConfigurationDeepFull
>;

export const fromPrisma = (
  input: GamePrismaGeneratedModelWithRelations
): GameFromPersisted => {
  const quiz = quizFromPrisma(input.quiz);
  const answerMap = new Map<string, number>();
  for (const question of quiz.questions) {
    question.answers.forEach((answer, index) => {
      answerMap.set(String(answer.id), index);
    });
  }
  return {
    currentQuestionIndex: input.currentQuestionIndex,
    quiz: quizFromPrisma(input.quiz),
    answers: input.answers.map((answersForQuestion) =>
      answersForQuestion.selectedAnswers.map((answer) =>
        Number(answerMap.get(answer.answerId))
      )
    ),
  };
};
