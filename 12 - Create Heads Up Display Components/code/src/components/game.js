import React from 'react';
import Question from './question';
import { loadQuestions } from '../helpers/QuestionsHelper';
import HUD from './hud';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            currentQuestion: null,
            loading: true,
            score: 0,
            questionNumber: 0
        };
    }

    async componentDidMount() {
        loadQuestions()
            .then((questions) => {
                this.setState(
                    {
                        questions
                    },
                    () => this.changeQuestion()
                );
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
            });
    }

    changeQuestion = (bonus = 0) => {
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
        console.log(this.state.score);
    };

    render = () => {
        return (
            <div className="container">
                {this.state.loading && <div id="loader" />}
                {!this.state.loading && (
                    <div id="game">
                        <HUD
                            questionNumber={this.state.questionNumber}
                            score={this.state.score}
                        />
                        {this.state.currentQuestion && (
                            <Question
                                question={this.state.currentQuestion}
                                changeQuestion={this.changeQuestion}
                            />
                        )}
                    </div>
                )}
            </div>
        );
    };
}
