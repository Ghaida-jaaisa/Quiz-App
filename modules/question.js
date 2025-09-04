export class Question {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }

  displayQuestion() {
    return `<h2>Q${this.id}: ${this.text}</h2>`;
  }

  validateAnswer(answer) {}
}

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

  validateAnswer(answer) {
    return answer === this.correctAnswer;
  }
}

export class TrueFalseQuestion extends Question {
  constructor(id, text, correctAnswer) {
    super(id, text);
    this.correctAnswer = correctAnswer;
  }

  displayQuestion() {
    return super.displayQuestion();   
  }

  displayAnswers() {
    return `<div>
                <input type="radio" name="q${this.id}" id="q${this.id}true" value="true">
                <label for="q${this.id}true">True</label>
            </div>
            <div>
                <input type="radio" name="q${this.id}" id="q${this.id}false" value="false">
                <label for="q${this.id}false">False</label>
            </div>`;
  }

  validateAnswer(answer) {
    return answer === this.correctAnswer.toString();
  }
}
