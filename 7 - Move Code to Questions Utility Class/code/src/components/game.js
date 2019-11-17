import React from 'react';
import Question from './question';
import { loadQuestions } from '../helpers/QuestionsHelper';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            currentQuestion: null
        };
    }

    async componentDidMount() {
        loadQuestions()
            .then((questions) =>
                this.setState({ questions, currentQuestion: questions[0] })
            )
            .catch(console.error);
    }

    render = () => {
        return (
            <div className="container">
                <div id="game">
                    {this.state.currentQuestion && (
                        <Question question={this.state.currentQuestion} />
                    )}
                </div>
            </div>
        );
    };
}
