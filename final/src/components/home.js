import React from 'react';
import { Link } from 'react-router-dom';

export default function home() {
    return (
        <div id="home" className="container">
            <h1>Quiz App</h1>
            <Link to="/game" className="btn">
                Start Game
            </Link>
            <Link to="/highScores" className="btn">
                High Scores
            </Link>
        </div>
    );
}
