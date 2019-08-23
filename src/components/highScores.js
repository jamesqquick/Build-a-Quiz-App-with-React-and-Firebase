import React from 'react';
import { withFirebase } from './Firebase';

class HighScores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            scores: []
        };
    }

    componentDidMount() {
        //register for the scores from firebase
        //        this.props.firebase.scores().push(5);
        //        this.props.firebase.scores().push(5);
        this.props.firebase.scores().push({ score: 5, name: 'James' });

        this.props.firebase.scores().on('value', (snapshot) => {
            const data = snapshot.val();
            const scores = [];
            for (let key in data) {
                const val = data[key];
                val['key'] = key;
                scores.push(val);
            }
            console.log(scores);
            this.setState({ scores });
        });
    }

    render() {
        const { scores } = this.state;
        return (
            <div className="container">
                <div id="highScoresList" className="flex-center flex-column">
                    <h1>HIGH SCORES</h1>
                    {scores.map((score) => (
                        <li key={score.key} className="high-score">
                            {score.name} - {score.score}
                        </li>
                    ))}
                </div>
            </div>
        );
    }
}

export default withFirebase(HighScores);
