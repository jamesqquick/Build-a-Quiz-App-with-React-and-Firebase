import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home';
import Game from './components/game';
import HighScores from './components/highScores';
import SaveScoreForm from './components/saveScoreForm';
const App = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/game" component={Game} />
                <Route path="/highScores" component={HighScores} />
                <Route path="/save" component={SaveScoreForm} />
            </div>
        </Router>
    );
};

export default App;
