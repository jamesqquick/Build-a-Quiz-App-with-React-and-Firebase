import React from 'react';
import Question from './question';
import HUD from './hud';
export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: {},
            currentQuestion: null,
            loading: true,
            score: 10,
            questionNumber: 0
        };
    }

    componentDidMount() {
        fetch(
            'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
        )
            .then((res) => {
                return res.json();
            })
            .then(({ results }) => {
                const questions = this.convertQuestionsFromAPI(results);
                this.setState({ questions }, () => {
                    this.changeQuestion();
                });
            });
    }

    render() {
        const { loading, currentQuestion, questionNumber, score } = this.state;
        return (
            <div className="container">
                <div id="loader" className={loading ? '' : 'hidden'} />
                <div id="game" className={loading ? 'hidden' : ''}>
                    <HUD questionNumber={questionNumber} score={score} />
                    {currentQuestion && (
                        <Question
                            question={currentQuestion}
                            changeQuestion={this.changeQuestion}
                        />
                    )}
                </div>
            </div>
        );
    }

    convertQuestionsFromAPI = (rawQuestions) => {
        return rawQuestions.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question
            };

            formattedQuestion.answerChoices = [
                ...loadedQuestion.incorrect_answers
            ];
            formattedQuestion.answer = Math.floor(Math.random() * 4);
            formattedQuestion.answerChoices.splice(
                formattedQuestion.answer,
                0,
                loadedQuestion.correct_answer
            );
            return formattedQuestion;
        });
    };

    changeQuestion = (bonus = 0) => {
        if (this.state.questions.length <= 0) {
            console.log('GAME OVER');
        } else {
            const randomQuestionIndex = Math.floor(
                Math.random() * this.state.questions.length
            );
            const currentQuestion = this.state.questions[randomQuestionIndex];
            const questions = this.state.questions.filter(
                (questions, index) => index !== randomQuestionIndex
            );

            this.setState({
                loading: false,
                questions,
                currentQuestion,
                questionNumber: this.state.questionNumber + 1,
                score: this.state.score + bonus
            });
        }
    };
}
