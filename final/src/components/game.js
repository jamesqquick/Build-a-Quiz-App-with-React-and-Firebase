import React, { useState, useEffect, useCallback } from 'react';
import Question from './question';
import HUD from './hud';
import SaveHighScoreForm from './saveScoreForm';
import { loadQuestions } from '../helpers/QuestionsHelper';

export default function Game({ history }) {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        let mounted = true;
        loadQuestions()
            .then(setQuestions)
            .catch(console.error);
        return () => {
            mounted = false;
        };
    }, [setQuestions]);

    const changeQuestion = useCallback(
        (bonus = 0) => {
            if (bonus > 0) {
                setScore(score + bonus);
            }
            if (!questions.length) {
                return setDone(true);
            }
            const randomQuestionIndex = Math.floor(
                Math.random() * questions.length
            );
            const currentQuestion = questions[randomQuestionIndex];
            const nextQuestions = questions.slice();
            nextQuestions.splice(randomQuestionIndex, 1);
            setQuestions(nextQuestions);
            setLoading(false);
            setCurrentQuestion(currentQuestion);
            setQuestionNumber(questionNumber + 1);
        },
        [
            score,
            setScore,
            questionNumber,
            setQuestionNumber,
            setCurrentQuestion,
            setQuestions,
            setLoading,
            questions,
            setDone
        ]
    );

    const scoreSaved = useCallback(() => {
        history.push('/');
    }, [history]);

    // This is our initial question set, where we didn't have a question before
    // but we have some available
    useEffect(() => {
        if (!currentQuestion && questions.length) {
            changeQuestion();
        }
    }, [currentQuestion, questions, changeQuestion]);

    return (
        <>
            {loading && <div id="loader" />}
            {!done && !loading && (
                <div id="game">
                    <HUD questionNumber={questionNumber} score={score} />
                    {currentQuestion && (
                        <Question
                            question={currentQuestion}
                            changeQuestion={changeQuestion}
                        />
                    )}
                </div>
            )}
            {done && (
                <SaveHighScoreForm
                    score={score}
                    history={history}
                    scoreSaved={scoreSaved}
                />
            )}
        </>
    );
}
