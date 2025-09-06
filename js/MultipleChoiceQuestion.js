import { Question } from "./Question";

export class MultipleChoiceQuestion extends Question {
  constructor(id, text, choices, correctAnswer) {
    super(id, text);
    this.choices = choices;
    this.correctAnswer = correctAnswer;
  }

  displayQuestion() {
    return super.displayQuestion();
  }

  displayAnswers() {
    let choicesHtml = this.choices
      .map(
        (choice, index) =>
          `<div>
                <input type="radio" name="q${this.id}" id="q${this.id}c${index}" value="${choice}">
                <label for="q${this.id}c${index}">${choice}</label>
            </div>`
      )
      .join("");
    return choicesHtml;
  }

  isCorrect(answer) {
    if (!Array.isArray(answer)) return false;
    if (!Array.isArray(this.correctAnswer)) return false;
    const sortedUser = [...answer].sort();
    const sortedCorrect = [...this.correctAnswer].sort();
    return (
      sortedUser.length === sortedCorrect.length &&
      sortedUser.every((val, idx) => val === sortedCorrect[idx])
    );
  }
}
