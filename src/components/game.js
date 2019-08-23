import React from 'react';
import Question from './question';
import HUD from './hud';
import SaveHighScoreForm from './saveScoreForm';
export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: {},
            currentQuestion: null,
            loading: true,
            score: 0,
            questionNumber: 0,
            done: false
        };
    }

    componentDidMount() {
        fetch(
            'https://opentdb.com/api.php?amount=3&category=9&difficulty=easy&type=multiple'
        )
            .then((res) => {
                return res.json();
            })
            .then(({ results }) => {
                const questions = this.convertQuestionsFromAPI(results);
                this.setState({ questions }, () => {
                    this.changeQuestion();
                });
            });
    }

    render() {
        const {
            loading,
            currentQuestion,
            questionNumber,
            score,
            done
        } = this.state;
        return (
            <div className="container">
                <div id="loader" className={loading ? '' : 'hidden'} />
                {!done && (
                    <div id="game" className={loading ? 'hidden' : ''}>
                        <HUD questionNumber={questionNumber} score={score} />
                        {currentQuestion && (
                            <Question
                                question={currentQuestion}
                                changeQuestion={this.changeQuestion}
                            />
                        )}
                    </div>
                )}
                {done && <SaveHighScoreForm score={score} />}
            </div>
        );
    }

    convertQuestionsFromAPI = (rawQuestions) => {
        return rawQuestions.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question
            };

            formattedQuestion.answerChoices = [
                ...loadedQuestion.incorrect_answers
            ];
            formattedQuestion.answer = Math.floor(Math.random() * 4);
            formattedQuestion.answerChoices.splice(
                formattedQuestion.answer,
                0,
                loadedQuestion.correct_answer
            );
            return formattedQuestion;
        });
    };

    changeQuestion = (bonus = 0) => {
        this.setState(
            {
                score: this.state.score + bonus
            },
            () => {
                if (this.state.questions.length <= 0) {
                    console.log('GAME OVER');
                    this.setState({
                        done: true
                    });
                } else {
                    const randomQuestionIndex = Math.floor(
                        Math.random() * this.state.questions.length
                    );
                    const currentQuestion = this.state.questions[
                        randomQuestionIndex
                    ];
                    const questions = this.state.questions.filter(
                        (questions, index) => index !== randomQuestionIndex
                    );

                    this.setState({
                        loading: false,
                        questions,
                        currentQuestion,
                        questionNumber: this.state.questionNumber + 1
                    });
                }
            }
        );
    };
}
