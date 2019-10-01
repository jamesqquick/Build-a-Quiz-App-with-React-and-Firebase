import React, { Component } from 'react';
import Question from './question';
import HUD from './hud';
import SaveHighScoreForm from './saveScoreForm';
import { loadQuestions } from '../helpers/QuestionsHelper';
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
        const questions = await loadQuestions();
        this.setState({ questions }, () => {
            this.changeQuestion();
        });
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
