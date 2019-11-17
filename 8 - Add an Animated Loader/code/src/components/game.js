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
                this.setState({
                    questions,
                    currentQuestion: questions[0],
                    loading: false
                });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
            });
    }

    render = () => {
        return (
            <div className="container">
                {this.state.loading && <div id="loader" />}
                {!this.state.loading && (
                    <div id="game">
                        {this.state.currentQuestion && (
                            <Question question={this.state.currentQuestion} />
                        )}
                    </div>
                )}
            </div>
        );
    };
}
