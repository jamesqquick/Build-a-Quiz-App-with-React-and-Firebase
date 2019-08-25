import React, { Component } from 'react';
import { withFirebase } from './Firebase';

class HighScores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            scores: []
        };
    }

    componentDidMount() {
        this.props.firebase.scores().on('value', (snapshot) => {
            const data = snapshot.val();
            const sortedScores = this.formatScoreData(data);
            this.setState({ scores: sortedScores, loading: false });
        });
    }

    componentWillUnmount() {
        this.props.firebase.scores().off();
    }

    render() {
        const { scores, loading } = this.state;
        return (
            <div className="container">
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
            </div>
        );
    }

    formatScoreData = (firebaseScores) => {
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
}

export default withFirebase(HighScores);
