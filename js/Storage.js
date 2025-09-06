export class Storage {
  static saveAnswers(answers) {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
  }

  static getAnswers() {
    return JSON.parse(localStorage.getItem("quizAnswers")) || {};
  }

  static clearAnswers() {
    localStorage.removeItem("quizAnswers");
  }

  static setQuizFinished() {
    localStorage.setItem("quizFinished", "true");
  }

  static isQuizFinished() {
    return localStorage.getItem("quizFinished") === "true";
  }

  static clearQuizFinished() {
    localStorage.removeItem("quizFinished");
  }
}
