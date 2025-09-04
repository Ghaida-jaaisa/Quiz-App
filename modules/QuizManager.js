import  { MultipleChoiceQuestion, TrueFalseQuestion } from "./Question.js";
import { Answer } from "./Answer.js";

export class QuizManager {
  constructor() {
    this.questions = [];
    this.score = 0;
    this.solvedQuestions = 0;
  }
  addQuestion(question) {
    this.questions.push(question);
  }
  displayAllQuestions() {
    return this.questions.map((q) => q.displayQuestion());
  }
  submitAnswers(answers) {
    this.score = 0;
    answers.forEach((ans) => {
      const question = this.questions.find((q) => q.id === ans.questionId);
      if (question && ans.isCorrect(question)) {
        this.score++;
      }
    });
    return this.score;
  }

  resetQuiz() {
    this.score = 0;
    this.questions = [];
  }

  getScore() {
    return this.score;
  }

  isDone() {
    return solvedQuestions.length === this.questions.length;
  }

  getTotalQuestions() {
    return this.questions.length;
  }

  isPassed() {
    return this.score / this.questions.length >= 0.7;
  }
}
