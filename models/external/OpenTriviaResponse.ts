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
