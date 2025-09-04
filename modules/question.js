export class Question {
    constructor(id, text, choices, correctAnswer) {
        this.id = id;
        this.text = text;
        this.choices = choices;
        this.correctAnswer = correctAnswer;
    }
    isCorrect(answer) {
        return answer === this.correctAnswer;
    }
    toJSON() {
        return {
            id: this.id,
            text: this.text,
            choices: this.choices,
            correctAnswer: this.correctAnswer
        };
    }
    static fromJSON(json) {
        return new Question(json.id, json.text, json.choices, json.correctAnswer);
    }

}