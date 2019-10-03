import React, { useState, useEffect } from "react";
import Question from "./question";
import HUD from "./hud";
import SaveHighScoreForm from "./saveScoreForm";
import { loadQuestions } from "../helpers/QuestionsHelper";

function Game({ history }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await loadQuestions();
      await setQuestions(questions);
      changeQuestion();
    };

    fetchQuestions();
  });

  const scoreSaved = () => {
    history.push("/");
  };

  const changeQuestion = (bonus = 0) => {
    setScore(prevScore => prevScore + bonus);

    if (!questions.length) {
      setDone(true);
    } else {
      const randomQuestionIndex = Math.floor(Math.random() * questions.length);
      const currentQuestion = questions[randomQuestionIndex];
      const newQuestions = questions.filter(
        (question, index) => index !== randomQuestionIndex
      );

      setLoading(false);
      setQuestions(newQuestions);
      setCurrentQuestion(currentQuestion);
      setQuestionNumber(prevQuestionNumber => prevQuestionNumber + 1);
    }

    return (
      <div className="container">
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
      </div>
    );
  };
}
export default Game;
