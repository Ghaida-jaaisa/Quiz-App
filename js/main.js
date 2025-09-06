import { QuizManager } from "./QuizManager";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { TrueFalseQuestion } from "./TrueFalseQuestion";

const quiz = new QuizManager();

quiz.addQuestion(
  new MultipleChoiceQuestion(
    1,
    "Which are JS data types?",
    ["String", "Number", "Boolean", "HTML"],
    ["String", "Number", "Boolean"]
  )
);
quiz.addQuestion(
  new TrueFalseQuestion(2, "JavaScript is a programming language.", "true")
);
quiz.addQuestion(
  new MultipleChoiceQuestion(
    3,
    "Select even numbers:",
    ["1", "2", "3", "4"],
    ["2", "4"]
  )
);
quiz.addQuestion(
  new TrueFalseQuestion(4, "CSS stands for Cascading Style Sheets.", "true")
);

const questionsContainer = document.getElementById("questions-container");
const resetBtn = document.getElementById("resetBtn");
const submitBtn = document.getElementById("submitBtn");
const startBtn = document.getElementById("startBtn");
const controlBtn = document.getElementById("controlBtn");
const dialog = document.getElementById("resultDialog");
const correctAnswersEl = document.getElementById("correctAnswers");
const totalAnswersEl = document.getElementById("totalAnswers");
const resultStatus = document.getElementById("resultStatus");
const closeResultBtn = document.getElementById("closeResultBtn");

function renderQuestions() {
  questionsContainer.innerHTML = "";
  quiz.questions.forEach((q) => {
    const div = document.createElement("div");
    div.classList.add("question");
    div.innerHTML = q.displayQuestion() + q.displayAnswers();
    questionsContainer.appendChild(div);

    const inputs = div.querySelectorAll(`input[name="q${q.id}"]`);
    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        const selected = Array.from(
          div.querySelectorAll(`input[name="q${q.id}"]:checked`)
        ).map((i) => i.value);
        quiz.answerQuestion(q.id, selected);
      });

      if (quiz.userAnswers[q.id]) {
        if (input.type === "checkbox") {
          input.checked = quiz.userAnswers[q.id].includes(input.value);
        } else {
          input.checked = quiz.userAnswers[q.id][0] === input.value;
        }
      }
    });
  });
}

startBtn.addEventListener("click", () => {
  renderQuestions();
  controlBtn.style.display = "block";
  startBtn.style.display = "none";
});

resetBtn.addEventListener("click", () => {
  quiz.resetQuiz();
  renderQuestions();
});

submitBtn.addEventListener("click", () => {
  const score = quiz.submitQuiz();
  correctAnswersEl.textContent = score;
  totalAnswersEl.textContent = quiz.questions.length;
  resultStatus.textContent = quiz.isPassed()
    ? "✅ You passed the test!"
    : "❌ You did not pass the test.";
  resultStatus.className = quiz.isPassed() ? "status success" : "status fail";
  dialog.style.display = "block";
});

closeResultBtn.addEventListener("click", () => {
  dialog.style.display = "none";
  quiz.resetQuiz();
  renderQuestions();
});
