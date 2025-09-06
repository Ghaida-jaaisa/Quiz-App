import { Question } from "./Question.js";

export class MultipleChoiceQuestion extends Question {
  constructor(id, text, choices, correctAnswer) {
    super(id, text);
    this.choices = choices;
    this.correctAnswer = correctAnswer;
  }

  displayAnswers() {
    return this.choices
      .map(
        (choice, index) => `
      <div>
        <input type="checkbox" name="q${this.id}" id="q${this.id}c${index}" value="${choice}">
        <label for="q${this.id}c${index}">${choice}</label>
      </div>`
      )
      .join("");
  }

  isCorrect(userAnswers) {
    if (!Array.isArray(userAnswers)) return false;
    const sortedUser = [...userAnswers].sort();
    const sortedCorrect = [...this.correctAnswer].sort();
    return (
      sortedUser.length === sortedCorrect.length &&
      sortedUser.every((val, idx) => val === sortedCorrect[idx])
    );
  }
}
