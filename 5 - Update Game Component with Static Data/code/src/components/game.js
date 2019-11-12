import React from 'react';
import Question from './question';

const dummyQuestion = {
    question: "What's the best programming language?",
    answerChoices: ['JavaScript', 'Java', 'C#', 'Swift']
};
export default class Game extends React.Component {
    render = () => {
        return (
            <div className="container">
                <div id="game">
                    <Question question={dummyQuestion} />
                </div>
            </div>
        );
    };
}
