import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from './Firebase';

function SaveScoreForm({ score, scoreSaved, firebase }) {
    const [username, setUsername] = useState('');

    const saveHighScore = (e) => {
        e.preventDefault();
        const record = {
            name: username,
            score: score
        };
        firebase.scores().push(record, () => {
            scoreSaved();
        });
    };

    const onUsernameChange = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    return (
        <div className="container">
            <h1 id="finalScore">{score}</h1>
            <form onSubmit={(e) => saveHighScore(e)}>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username"
                    value={username}
                    onChange={onUsernameChange}
                />
                <button
                    type="submit"
                    className="btn"
                    id="saveScoreBtn"
                    disabled={!username}
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

export default withFirebase(SaveScoreForm);
