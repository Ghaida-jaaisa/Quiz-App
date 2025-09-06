export class Question {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }

  displayQuestion() {
    return `<h2>Q${this.id}: ${this.text}</h2>`;
  }

}
