import React from 'react';

export default function question({ question }) {
    return (
        <div>
            <h2 id="question">{question.question}</h2>
            <div className="choice-container">
                <p className="choice-prefix">A</p>
                <p className="choice-text" data-number="1">
                    {question.choice1}
                </p>
            </div>
            <div className="choice-container">
                <p className="choice-prefix">B</p>
                <p className="choice-text" data-number="2">
                    {question.choice2}
                </p>
            </div>
            <div className="choice-container">
                <p className="choice-prefix">C</p>
                <p className="choice-text" data-number="3">
                    {question.choice3}
                </p>
            </div>
            <div className="choice-container">
                <p className="choice-prefix">D</p>
                <p className="choice-text" data-number="4">
                    {question.choice4}
                </p>
            </div>
        </div>
    );
}
