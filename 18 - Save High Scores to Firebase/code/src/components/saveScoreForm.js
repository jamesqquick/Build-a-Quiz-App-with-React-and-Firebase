import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from './Firebase/context';

function SaveScoreForm({ score, scoreSaved }) {
    const [username, setUsername] = useState('');
    const firebase = useFirebase();

    const saveHighScore = (e) => {
        e.preventDefault();
        const record = {
            name: username,
            score: score
        };
        console.log(record);
        firebase.scores().push(record, () => {
            console.log(scoreSaved);
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

export default SaveScoreForm;
