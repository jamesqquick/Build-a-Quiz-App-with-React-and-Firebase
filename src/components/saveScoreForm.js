import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from './Firebase';
function saveScoreForm() {
    //        this.props.firebase.scores().push(5);
    return (
        <div className="container">
            <div id="end" className="flex-center flex-column">
                <h1 id="finalScore">100</h1>
                <form>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                    />
                    <button
                        type="submit"
                        className="btn"
                        id="saveScoreBtn"
                        onClick="saveHighScore(event)"
                        disabled
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

export default withFirebase(saveScoreForm);
