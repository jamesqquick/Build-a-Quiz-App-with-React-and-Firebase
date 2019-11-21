import React, { useState } from 'react';

export default function Question({ question, changeQuestion }) {
    const [classToApply, setClassToApply] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [answering, setAnswering] = useState(false);

    const checkAnswer = (selectedAnswer) => {
        if (answering) return;

        setAnswering(true);
        setSelectedAnswer(selectedAnswer);

        const classToApply =
            selectedAnswer === question.answer ? 'correct' : 'incorrect';
        setClassToApply(classToApply);
        const bonus = selectedAnswer === question.answer ? 10 : 0;

        setTimeout(() => {
            setSelectedAnswer(-1);
            setAnswering(false);
            changeQuestion(bonus);
        }, 1000);
    };

    return (
        <div>
            <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
            {question.answerChoices.map((choice, index) => (
                <div
                    key={index}
                    className={`choice-container ${selectedAnswer === index &&
                        classToApply}`}
                    onClick={() => checkAnswer(index)}
                >
                    <p className="choice-prefix">{index + 1}</p>
                    <p
                        className="choice-text"
                        dangerouslySetInnerHTML={{ __html: choice }}
                    ></p>
                </div>
            ))}
        </div>
    );
}
