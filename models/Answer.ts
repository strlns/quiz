export class Answer {
  answerText: string = "";
  isSolution: boolean = false;

  constructor(answerText: string, isSolution: boolean) {
    this.answerText = answerText;
    this.isSolution = isSolution;
  }
}
