export interface OpenTriviaResponse {
  response_code: number;
  results: Result[];
}

export interface Result {
  category: string;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export enum Difficulty {
  Easy = "easy",
  Hard = "hard",
  Medium = "medium",
}

export enum QuestionType {
  Boolean = "boolean",
  Multiple = "multiple",
}

export interface OpenTriviaResponseWithShuffledAnswers {
  response_code: number;
  results: ResultWithShuffledAnswers[];
}

export type ResultWithShuffledAnswers =
  | (Result & {
      type: QuestionType.Multiple;
      shuffled_answers: string[];
      correct_index: number;
    })
  | (Result & {
      type: QuestionType.Boolean;
      shuffled_answers: [string, string];
      incorrect_answers: [string];
      correct_index: number;
    });
