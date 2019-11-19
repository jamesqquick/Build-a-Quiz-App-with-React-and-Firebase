import React, { Component } from 'react';
import Question from './Question';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            currentQuestion: null
        };
    }
    async componentDidMount() {
        const url = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;

        try {
            const res = await fetch(url);
            const { results } = await res.json();

            const questions = results.map((loadedQuestion) => {
                const formattedQuestion = {
                    question: loadedQuestion.question,
                    answerChoices: [...loadedQuestion.incorrect_answers]
                };

                formattedQuestion.answer = Math.floor(Math.random() * 4);

                formattedQuestion.answerChoices.splice(
                    formattedQuestion.answer,
                    0,
                    loadedQuestion.correct_answer
                );

                return formattedQuestion;
            });
            this.setState({ questions, currentQuestion: questions[0] });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <>
                {this.state.currentQuestion && (
                    <Question question={this.state.currentQuestion} />
                )}
            </>
        );
    }
}
