import React, { Component } from 'react';
import Question from './Question';

const dummyQuestion = {
    question: "What's the best programming language?!",
    answerChoices: ['JavaScript', 'Java', 'C#', 'Swift']
};

export default class Game extends Component {
    render() {
        return (
            <>
                <Question question={dummyQuestion} />
            </>
        );
    }
}
