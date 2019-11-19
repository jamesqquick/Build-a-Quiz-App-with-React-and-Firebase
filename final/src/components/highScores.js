import React, { useState, useEffect } from 'react';
import { useFirebase } from './Firebase/context';

const HighScores = (props) => {
    const [loading, setLoading] = useState(true);
    const [scores, setScores] = useState([]);
    const firebase = useFirebase();

    useEffect(() => {
        firebase.scores().once('value', (snapshot) => {
            const data = snapshot.val();
            const sortedScores = formatScoreData(data);
            setLoading(false);
            setScores(sortedScores);
        });
    });

    return (
        <>
            <h1>HIGH SCORES</h1>
            {!!loading ? (
                <p>Loading...</p>
            ) : (
                <div id="highScoresList">
                    {scores.map((score) => (
                        <li key={score.key} className="high-score">
                            {score.name} - {score.score}
                        </li>
                    ))}
                </div>
            )}
        </>
    );
};

const formatScoreData = (firebaseScores) => {
    const scores = [];
    for (let key in firebaseScores) {
        const val = firebaseScores[key];
        val['key'] = key;
        scores.push(val);
    }
    const sortedScores = scores
        .sort((score1, score2) => score2.score - score1.score)
        .slice(0, 10);
    return sortedScores;
};

export default HighScores;
