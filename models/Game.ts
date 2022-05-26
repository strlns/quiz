import { Quiz } from "./Quiz";
import { Answer } from "./Answer";

type GameAnswers = (Answer | undefined)[];

export class Game {
  constructor(
    quiz: Quiz,
    answers?: GameAnswers,
    currentQuestionIndex?: number
  ) {
    this.quiz = quiz;
    if (answers) this.answers = answers;
    this.currentQuestionIndex = currentQuestionIndex ?? 0;
  }
  quiz: Quiz;
  answers: GameAnswers = [];
  currentQuestionIndex: number;
}
