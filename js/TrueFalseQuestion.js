import { Question } from "./Question";

export class TrueFalseQuestion extends Question {
  constructor(id, text, correctAnswer) {
    super(id, text);
    this.correctAnswer = correctAnswer; 
  }

  displayAnswers() {
    return `
      <div>
        <input type="radio" name="q${this.id}" id="q${this.id}true" value="true">
        <label for="q${this.id}true">True</label>
      </div>
      <div>
        <input type="radio" name="q${this.id}" id="q${this.id}false" value="false">
        <label for="q${this.id}false">False</label>
      </div>`;
  }

  isCorrect(answer) {
    return (
      this.correctAnswer.toString().toLowerCase() ===
      answer.toString().toLowerCase()
    );
  }
}
