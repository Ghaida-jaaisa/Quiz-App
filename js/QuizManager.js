import { Storage } from "./Storage.js";

export class QuizManager {
  constructor() {
    this.questions = [];
    this.userAnswers = Storage.getAnswers();
    this.score = 0;
    this.passingScore = 0.7;
  }

  addQuestion(question) {
    this.questions.push(question);
  }

  answerQuestion(questionId, answer) {
    this.userAnswers[questionId] = answer;
    Storage.saveAnswers(this.userAnswers);
  }

  submitQuiz() {
    this.score = 0;
    this.questions.forEach((q) => {
      const ans = this.userAnswers[q.id] || [];
      if (q.isCorrect(ans)) this.score++;
    });
    Storage.setQuizFinished();
    return this.score;
  }

  resetQuiz() {
    this.userAnswers = {};
    Storage.clearAnswers();
    Storage.clearQuizFinished();
    this.score = 0;
  }

  isPassed() {
    return this.score / this.questions.length >= this.passingScore;
  }
}
