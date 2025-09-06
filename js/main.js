import { QuizManager } from "./QuizManager";
import { Storage } from "./Storage";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { TrueFalseQuestion } from "./TrueFalseQuestion";

const quiz = new QuizManager();


// add questions
quiz.addQuestion(
  new MultipleChoiceQuestion(1, )

)
// عند تحميل الصفحة
if (Storage.isQuizFinished()) {
  Storage.clearAnswers();
  Storage.clearQuizFinished();
}
const savedAnswers = Storage.getAnswers();
// استخدمي savedAnswers لعرض الإجابات المختارة في الـ UI

// عند اختيار إجابة
function onAnswerSelected(questionId, answer) {
  const answers = Storage.getAnswers();
  answers[questionId] = answer;
  Storage.saveAnswers(answers);
}

// عند الضغط على Reset
function onReset() {
  Storage.clearAnswers();
  Storage.clearQuizFinished();
  // أعد تعيين الـ UI
}

// عند الضغط على Submit
function onSubmit() {
  const userAnswers = Object.entries(Storage.getAnswers()).map(([questionId, answer]) => ({
    questionId: Number(questionId),
    answer: answer,
  }));
  quiz.submitAnswers(userAnswers);
  // أظهر النتيجة في الـ UI
  Storage.setQuizFinished();
}