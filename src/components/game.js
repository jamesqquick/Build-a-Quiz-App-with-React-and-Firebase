import React, { Component, useState, useEffect  } from 'react';

import Question from './question';
import HUD from './hud';
import SaveHighScoreForm from './saveScoreForm';
import { loadQuestions } from '../helpers/QuestionsHelper';

export default function Game(){
    const [questions, setQuestions] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(async () =>{
        const questions = await loadQuestions();
        setQuestions(this.changeQuestion());
    });

    return (
        <div className="container">
            {loading && <div id="loader" />}
            {!done && !loading && (
                <div id="game">
                    <HUD questionNumber={questionNumber} score={score} />
                    {currentQuestion && (
                        <Question
                            question={currentQuestion}
                            changeQuestion={this.changeQuestion}
                        />
                    )}
                </div>
            )}
            {done && (
                <SaveHighScoreForm
                    score={score}
                    history={this.props.history}
                    scoreSaved={this.scoreSaved}
                />
            )}
        </div>
    );    
}
    const scoreSaved = () => {
        this.props.history.push('/');
    };

    const changeQuestion = (bonus = 0) => {
            setScore(score + bonus),
            () => {
                if (questions <= 0) {
                    setDone(true);
                } else {
                    const randomQuestionIndex = Math.floor(
                        Math.random() * questions.length
                    );
                    const currentQuestion = questions[
                        randomQuestionIndex
                    ];
                    const questions = questions.filter(
                        (questions, index) => index !== randomQuestionIndex
                    );
                    setLoading(false);
                    setQuestionNumber(questionNumber + 1);
                }
            }
        
    };

