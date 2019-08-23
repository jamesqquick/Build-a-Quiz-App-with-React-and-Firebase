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
        this.props.firebase.scores().on('value', (snapshot) => {
            console.log(snapshot.val());
        });
    }

    render() {
        return (
            <div className="container">
                <div id="highScores" className="flex-center flex-column">
                    <h1>HIGH SCORES</h1>
                </div>
            </div>
        );
    }
}

export default withFirebase(HighScores);
