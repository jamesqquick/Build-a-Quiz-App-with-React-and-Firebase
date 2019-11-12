import React from 'react';
import ProgressBar from './progressBar';

export default function hud({ score, questionNumber }) {
    return (
        <div id="hud">
            <div id="hud-item">
                <p id="progressText" className="hud-prefix">
                    {`Question ${questionNumber}/10`}
                </p>
                <ProgressBar max={10} current={questionNumber} />
            </div>
            <div id="hud-item">
                <p className="hud-prefix">Score</p>
                <h1 className="hud-main-text" id="score">
                    {score}
                </h1>
            </div>
        </div>
    );
}
