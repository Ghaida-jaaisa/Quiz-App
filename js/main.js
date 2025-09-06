import { QuizManager } from "./QuizManager.js";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion.js";
import { TrueFalseQuestion } from "./TrueFalseQuestion.js";

const quiz = new QuizManager();

quiz.addQuestion(
  new MultipleChoiceQuestion(
    1,
    "Which are primitive data types in JavaScript?",
    ["Object", "String", "Number", "Boolean"],
    ["String", "Number", "Boolean"]
  )
);

quiz.addQuestion(
  new TrueFalseQuestion(
    2,
    "JavaScript can be used for both Frontend and Backend development.",
    "true"
  )
);

quiz.addQuestion(
  new MultipleChoiceQuestion(
    3,
    "Which keywords are used to declare variables in JavaScript?",
    ["let", "var", "const", "define"],
    ["let", "var", "const"]
  )
);

quiz.addQuestion(
  new TrueFalseQuestion(4, "NaN stands for 'Not a Number'.", "true")
);

quiz.addQuestion(
  new MultipleChoiceQuestion(
    5,
    "Which of the following are looping statements?",
    ["for", "while", "repeat", "do...while"],
    ["for", "while", "do...while"]
  )
);

quiz.addQuestion(
  new TrueFalseQuestion(
    6,
    "In JavaScript, arrays are zero-indexed (start from 0).",
    "true"
  )
);

quiz.addQuestion(
  new MultipleChoiceQuestion(
    7,
    "Which are valid comparison operators in JS?",
    ["==", "===", "=", "!="],
    ["==", "===", "!="]
  )
);

quiz.addQuestion(
  new TrueFalseQuestion(
    8,
    "JSON stands for JavaScript Object Notation.",
    "true"
  )
);

quiz.addQuestion(
  new MultipleChoiceQuestion(
    9,
    "Which methods are used for array manipulation?",
    ["push", "pop", "append", "shift"],
    ["push", "pop", "shift"]
  )
);

quiz.addQuestion(
  new TrueFalseQuestion(
    10,
    "The 'this' keyword in JavaScript always refers to the global object.",
    "false"
  )
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

    div.innerHTML = `
      <div class="question-card">
        <img src="./imgs/modern-question-mark-template-idea-message-vector_1017-47932.jpg" alt="question">
        <h2>${q.text}</h2>
        <div class="answers" style="display:none;">${q.displayAnswers()}</div>
        <div class="right-side">
          <p class="status-text unsolved">Unsolved</p>
          <div class="buttons">
            <button class="enterBtn">Enter</button>
          </div>
        </div>
      </div>
    `;

    questionsContainer.appendChild(div);

    const answersDiv = div.querySelector(".answers");
    const enterBtn = div.querySelector(".enterBtn");
    const statusText = div.querySelector(".status-text");

    enterBtn.addEventListener("click", () => {
      answersDiv.style.display = "block";
      enterBtn.style.display = "none";
    });

    const inputs = div.querySelectorAll(`input[name="q${q.id}"]`);
    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        const selected = Array.from(
          div.querySelectorAll(`input[name="q${q.id}"]:checked`)
        ).map((i) => i.value);

        quiz.answerQuestion(q.id, selected);

        if (selected.length > 0) {
          statusText.textContent = "Solved";
          statusText.classList.remove("unsolved");
          statusText.classList.add("solved");
        } else {
          statusText.textContent = "Unsolved";
          statusText.classList.remove("solved");
          statusText.classList.add("unsolved");
        }
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
  controlBtn.style.display = "";
  dialog.style.display = "none";
  startBtn.style.display = "none";
});

resetBtn.addEventListener("click", () => {
  quiz.resetQuiz();
  renderQuestions();
  questionsContainer.style.display = "";
});

submitBtn.addEventListener("click", () => {
  const score = quiz.submitQuiz();
  correctAnswersEl.textContent = score;
  totalAnswersEl.textContent = quiz.questions.length;
  resultStatus.textContent = quiz.isPassed()
    ? "✅ You passed the test!"
    : "❌ You did not pass the test.";
  resultStatus.className = quiz.isPassed() ? "status success" : "status fail";
  dialog.style.display = "";
  questionsContainer.style.display = "none";
});

closeResultBtn.addEventListener("click", () => {
  dialog.style.display = "none";
  quiz.resetQuiz();
  renderQuestions();
  questionsContainer.style.display = "";
});
