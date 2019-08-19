import React from 'react';
import { Link } from 'react-router-dom';
export default function saveScoreForm() {
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
