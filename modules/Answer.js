export class Answer {
  constructor(id, questionId, content) {
    this.id = id;
    this.questionId = questionId;
    this.content = content;
  }

  isCorrect(question) {
    return question.validateAnswer(this.content);
  }
}
