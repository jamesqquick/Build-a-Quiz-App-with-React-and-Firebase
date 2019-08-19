import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Game from './components/game';
import Home from './components/home';
import HighScores from './components/highScores';
import saveScoreForm from './components/saveScoreForm';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/game" component={Game} />
            <Route path="/highScores" component={HighScores} />
            <Route path="/save" component={saveScoreForm} />
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
