import React, { Component } from 'react';
import Question from './Question';
import { loadQuestions } from '../helpers/QuestionsHelper';
import HUD from './HUD';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            currentQuestion: null,
            loading: true,
            score: 0,
            questionNumber: 0,
            done: false
        };
    }
    async componentDidMount() {
        try {
            const questions = await loadQuestions();
            this.setState(
                {
                    questions
                },
                () => {
                    this.changeQuestion();
                }
            );
        } catch (err) {
            console.error(err);
        }
    }

    changeQuestion = (bonus = 0) => {
        if (this.state.questions.length === 0) {
            return this.setState({ done: true });
        }

        const randomQuestionIndex = Math.floor(
            Math.random() * this.state.questions.length
        );
        const currentQuestion = this.state.questions[randomQuestionIndex];
        const remainingQuestions = [...this.state.questions];
        remainingQuestions.splice(randomQuestionIndex, 1);

        this.setState((prevState) => ({
            questions: remainingQuestions,
            currentQuestion,
            loading: false,
            score: prevState.score + bonus,
            questionNumber: prevState.questionNumber + 1
        }));
    };

    render() {
        return (
            <>
                {this.state.loading && !this.state.done && <div id="loader" />}

                {!this.state.loading &&
                    !this.state.done &&
                    this.state.currentQuestion && (
                        <div>
                            <HUD
                                score={this.state.score}
                                questionNumber={this.state.questionNumber}
                            />
                            <Question
                                question={this.state.currentQuestion}
                                changeQuestion={this.changeQuestion}
                            />
                        </div>
                    )}
                {this.state.done && <h1>DONE!!</h1>}
            </>
        );
    }
}
