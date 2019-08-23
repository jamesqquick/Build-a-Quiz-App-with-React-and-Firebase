import React from 'react';

export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classToApply: '',
            selectedAnswer: -1,
            answering: false
        };
    }
    render() {
        const { question } = this.props;
        return (
            <div>
                <h2 id="question">{question.question}</h2>
                {[1, 2, 3, 4].map((num) => (
                    <div
                        key={num}
                        className={`choice-container ${this.state
                            .selectedAnswer === num &&
                            this.state.classToApply}`}
                        onClick={() => this.checkAnswer(question, num)}
                    >
                        <p className="choice-prefix">{num}</p>
                        <p className="choice-text">
                            {question['choice' + num]}
                        </p>
                    </div>
                ))}
            </div>
        );
    }

    checkAnswer(question, selectedAnswer) {
        if (!this.state.answering) {
            const classToApply =
                selectedAnswer === question.answer ? 'correct' : 'incorrect';
            this.setState({
                classToApply,
                selectedAnswer,
                answering: true
            });
            setTimeout(() => {
                this.setState({
                    selectedAnswer: -1,
                    answering: false
                });
                this.props.changeQuestion();
            }, 1000);
        }
    }
}
