import React from 'react';
import Question from './question';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            currentQuestion: null
        };
    }

    async componentDidMount() {
        try {
            const res = await fetch(
                `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`
            );
            const { results } = await res.json();
            const questions = results.map((loadedQuestion) => {
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
            console.log(questions);
            this.setState({ questions, currentQuestion: questions[0] });
        } catch (ex) {
            console.error(ex);
            return null;
        }
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
