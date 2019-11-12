import React from 'react';

export default function home() {
    return (
        <div id="home" className="container">
            <h1>Quiz App</h1>
            <a href="/game" className="btn">
                Start Game
            </a>
            <a href="/highScores" className="btn">
                High Scores
            </a>
        </div>
    );
}
