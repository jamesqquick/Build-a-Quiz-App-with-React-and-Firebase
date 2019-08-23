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
                <h2
                    id="question"
                    dangerouslySetInnerHTML={{ __html: question.question }}
                />
                {question.answerChoices.map((choice, index) => (
                    <div
                        key={index}
                        className={`choice-container ${this.state
                            .selectedAnswer === index &&
                            this.state.classToApply}`}
                        onClick={() => this.checkAnswer(question, index)}
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

    checkAnswer(question, selectedAnswer) {
        if (!this.state.answering) {
            const classToApply =
                selectedAnswer === question.answer ? 'correct' : 'incorrect';
            const bonus = selectedAnswer === question.answer ? 10 : 0;
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
                this.props.changeQuestion(bonus);
            }, 1000);
        }
    }
}
