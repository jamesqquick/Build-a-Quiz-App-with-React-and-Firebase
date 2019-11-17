import React from 'react';

export default function Question({ question }) {
    return (
        <div>
            <h2
                id="question"
                dangerouslySetInnerHTML={{ __html: question.question }}
            />
            {question.answerChoices.map((choice, index) => (
                <div key={index} className="choice-container">
                    <p className="choice-prefix">{index + 1}</p>
                    <p
                        className="choice-text"
                        dangerouslySetInnerHTML={{ __html: choice }}
                    />
                </div>
            ))}
        </div>
    );
}
