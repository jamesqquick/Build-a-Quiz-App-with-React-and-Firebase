import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from './Firebase';
class saveScoreForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }
    render() {
        return (
            <div className="container">
                <div id="end" className="flex-center flex-column">
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
                    <Link to="/game" className="btn">
                        Play Again
                    </Link>
                    <Link to="/" className="btn">
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }

    saveHighScore = (e) => {
        console.log('SavinG', this.props.score);
        e.preventDefault();
    };

    onInputChange = (e) => {
        const name = e.target.name;
        const text = e.target.value;
        this.setState({ [name]: text });
    };
}

export default withFirebase(saveScoreForm);
