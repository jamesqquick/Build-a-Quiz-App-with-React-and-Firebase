import React from 'react';
import Question from './question';
import { loadQuestions } from '../helpers/QuestionsHelper';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            currentQuestion: null,
            loading: true
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

    changeQuestion = () => {
        const randomQuestionIndex = Math.floor(
            Math.random() * this.state.questions.length
        );
        const currentQuestion = this.state.questions[randomQuestionIndex];
        const remainingQuestions = [...this.state.questions];
        remainingQuestions.splice(randomQuestionIndex, 1);

        this.setState({
            questions: remainingQuestions,
            currentQuestion,
            loading: false
        });
    };

    render = () => {
        return (
            <div className="container">
                {this.state.loading && <div id="loader" />}
                {!this.state.loading && (
                    <div id="game">
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
