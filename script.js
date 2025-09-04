import { QuizManager } from "./modules/QuizManager.js";
import { MultipleChoiceQuestion } from "./modules/Question.js";
import { TrueFalseQuestion } from "./modules/Question.js";
import { Answer } from "./modules/Answer.js";

document.getElementById("startBtn").addEventListener("click", function () {
    startBtn.style.display = "none";
  const resetBtn = document.getElementById("resetBtn");
  const submitBtn = document.getElementById("submitBtn");
  const controlBtn = document.getElementById("controlBtn");



  startBtn?.addEventListener("click", function () {
    alert("Quiz Started!");
  });

  const quizManager = new QuizManager();
  quizManager.addQuestion(
    new MultipleChoiceQuestion(
      1,
      "What is the capital of France?",
      ["Berlin", "Madrid", "Paris", "Rome"],
      "Paris"
    )
  );
  quizManager.addQuestion(new TrueFalseQuestion(2, "The sky is blue.", true));

  let questionsContainer = document.getElementById("questions-container");

  if (
    quizManager !== null &&
    typeof quizManager.displayAllQuestions === "function"
  ) {
    if (questionsContainer) {
      questionsContainer.innerHTML = quizManager.questions
        .map(
          (q) => `
            <div class="question">
              <div id="question-card">
                <img src="./imgs/modern-question-mark-template-idea-message-vector_1017-47932.jpg" alt="question">
                ${q.displayQuestion()}
                <div class="right-side">
                  <p id="solved">Solved</p>
                  <div id="bottons">
                    <button id="enterBtn">Enter</button>
                    <button id="editBtn">Edit</button>
                  </div>
                </div>
              </div>
              <div class="answer-card" style="display: none;">
                ${q.displayAnswers()}
              </div>
            </div>
          `
        )
        .join("");
    }
  }
});
