import React from 'react';

export default class HighScores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
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
