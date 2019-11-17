import React from 'react';
import Question from './question';
import { loadQuestions } from '../helpers/QuestionsHelper';
import HUD from './hud';
import SaveScoreForm from './saveScoreForm';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            currentQuestion: null,
            loading: true,
            score: 0,
            questionNumber: 0,
            done: false
        };
    }

    async componentDidMount() {
        loadQuestions()
            .then((questions) => {
                this.setState(
                    {
                        questions
                    },
                    () => this.changeQuestion()
                );
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
            });
    }

    scoreSaved = () => this.props.history.push('/');

    changeQuestion = (bonus = 0) => {
        if (this.state.questions.length === 0) {
            return this.setState({ done: true });
        }

        const randomQuestionIndex = Math.floor(
            Math.random() * this.state.questions.length
        );
        const currentQuestion = this.state.questions[randomQuestionIndex];
        const remainingQuestions = [...this.state.questions];
        remainingQuestions.splice(randomQuestionIndex, 1);

        this.setState((prevState) => ({
            questions: remainingQuestions,
            currentQuestion,
            loading: false,
            score: prevState.score + bonus,
            questionNumber: prevState.questionNumber + 1
        }));
        console.log(this.state.score);
    };

    render = () => {
        const {
            done,
            loading,
            questionNumber,
            score,
            currentQuestion
        } = this.state;
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
                    <SaveScoreForm score={score} scoreSaved={this.scoreSaved} />
                )}
            </div>
        );
    };
}
