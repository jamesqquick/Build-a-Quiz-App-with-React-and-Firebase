import React from 'react';
import Question from './question';
export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: {},
            currentQuestionIndex: -1,
            loading: true
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
                //Convert to necessary structure
                const questions = results.map((loadedQuestion) => {
                    const formattedQuestion = {
                        question: loadedQuestion.question
                    };

                    const answerChoices = [...loadedQuestion.incorrect_answers];
                    formattedQuestion.answer =
                        Math.floor(Math.random() * 3) + 1;
                    answerChoices.splice(
                        formattedQuestion.answer - 1,
                        0,
                        loadedQuestion.correct_answer
                    );

                    answerChoices.forEach((choice, index) => {
                        formattedQuestion['choice' + (index + 1)] = choice;
                    });

                    return formattedQuestion;
                });

                this.setState({
                    loading: false,
                    questions,
                    currentQuestionIndex: 0
                });
            });
    }

    render() {
        const { loading, currentQuestionIndex, questions } = this.state;
        const currentQuestion = questions[currentQuestionIndex];
        return (
            <div className="container">
                <div id="loader" className={loading ? '' : 'hidden'} />
                <div id="game" className={loading ? 'hidden' : ''}>
                    <div id="hud">
                        <div id="hud-item">
                            <p id="progressText" className="hud-prefix">
                                Question
                            </p>
                            <div id="progressBar">
                                <div id="progressBarFull" />
                            </div>
                        </div>
                        <div id="hud-item">
                            <p className="hud-prefix">Score</p>
                            <h1 className="hud-main-text" id="score">
                                0
                            </h1>
                        </div>
                    </div>
                    {currentQuestion && <Question question={currentQuestion} />}
                </div>
            </div>
        );
    }
}
