import React, { Component } from 'react';
import Question from './question';
import HUD from './hud';
import SaveHighScoreForm from './saveScoreForm';
export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: {},
            currentQuestion: null,
            loading: true,
            score: 0,
            questionNumber: 0,
            done: false
        };
    }

    async componentDidMount() {
        const amount = 10;
        const category = 9;
        const difficulty = 'easy';
        const type = 'multiple';

        try {
            const res = await fetch(
                `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
            );
            const { results } = await res.json();
            const questions = this.convertQuestionsFromAPI(results);
            this.setState({ questions }, () => {
                this.changeQuestion();
            });
        } catch (ex) {
            console.error(ex);
        }
    }

    render() {
        const {
            loading,
            currentQuestion,
            questionNumber,
            score,
            done
        } = this.state;
        return (
            <div className="container">
                {loading && <div id="loader" />}
                {!done && !loading && (
                    <div id="game">
                        <HUD questionNumber={questionNumber} score={score} />
                        {currentQuestion && (
                            <Question
                                question={currentQuestion}
                                changeQuestion={this.changeQuestion}
                            />
                        )}
                    </div>
                )}
                {done && (
                    <SaveHighScoreForm
                        score={score}
                        history={this.props.history}
                        scoreSaved={this.scoreSaved}
                    />
                )}
            </div>
        );
    }

    scoreSaved = () => {
        this.props.history.push('/');
    };

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
        this.setState(
            {
                score: this.state.score + bonus
            },
            () => {
                if (this.state.questions.length <= 0) {
                    this.setState({
                        done: true
                    });
                } else {
                    const randomQuestionIndex = Math.floor(
                        Math.random() * this.state.questions.length
                    );
                    const currentQuestion = this.state.questions[
                        randomQuestionIndex
                    ];
                    const questions = this.state.questions.filter(
                        (questions, index) => index !== randomQuestionIndex
                    );

                    this.setState({
                        loading: false,
                        questions,
                        currentQuestion,
                        questionNumber: this.state.questionNumber + 1
                    });
                }
            }
        );
    };
}
