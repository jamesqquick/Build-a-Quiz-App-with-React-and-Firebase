import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from './Firebase';
class saveScoreForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }
    render() {
        return (
            <div className="container">
                <h1 id="finalScore">{this.props.score}</h1>
                <form onSubmit={(e) => this.saveHighScore(e)}>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        value={this.state.username}
                        onChange={this.onInputChange}
                    />
                    <button
                        type="submit"
                        className="btn"
                        id="saveScoreBtn"
                        disabled={!this.state.username}
                    >
                        Save
                    </button>
                </form>
                <Link to="/" className="btn">
                    Go Home
                </Link>
            </div>
        );
    }

    saveHighScore = (e) => {
        e.preventDefault();
        const record = {
            name: this.state.username,
            score: this.props.score
        };
        this.props.firebase.scores().push(record, () => {
            this.props.scoreSaved();
        });
    };

    onInputChange = (e) => {
        const name = e.target.name;
        const text = e.target.value;
        this.setState({ [name]: text });
    };
}

export default withFirebase(saveScoreForm);
