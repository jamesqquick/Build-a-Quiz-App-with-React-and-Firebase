import React, { useState } from 'react';

export default function Question({ question, changeQuestion }) {
    const [classToApply, setClassToApply] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [answering, setAnswering] = useState(false);

    const checkAnswer = (question, selectedAnswer) => {
        if (answering) return;

        const classToApply =
            selectedAnswer === question.answer ? 'correct' : 'incorrect';
        const bonus = selectedAnswer === question.answer ? 10 : 0;
        setClassToApply(classToApply);
        setSelectedAnswer(selectedAnswer);
        setAnswering(true);

        setTimeout(() => {
            setSelectedAnswer(-1);
            setAnswering(false);
            changeQuestion(bonus);
        }, 1000);
    };

    return (
        <div>
            <h2
                id="question"
                dangerouslySetInnerHTML={{ __html: question.question }}
            />
            {question.answerChoices.map((choice, index) => (
                <div
                    key={index}
                    className={`choice-container ${selectedAnswer === index &&
                        classToApply}`}
                    onClick={() => checkAnswer(question, index)}
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
