import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { TrueFalseQuestion } from "./TrueFalseQuestion";

export class QuizManager {
  constructor() {
    this.questions = [];
    this.score = 0;
    this.passingScore = 0.7;
  }

  addQuestion(question) {
    this.questions.push(question);
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

  getScore() {
    return this.score;
  }

  isPassed() {
    return this.score / this.questions.length >= passingScore;
  }
}
