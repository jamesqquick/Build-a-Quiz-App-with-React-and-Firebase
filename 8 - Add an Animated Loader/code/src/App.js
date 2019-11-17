import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home';
import Game from './components/game';
import HighScores from './components/highScores';
const App = () => {
    return (
        <Router>
            <Route exact path="/" component={Home} />
            <Route path="/game" component={Game} />
            <Route path="/highScores" component={HighScores} />
        </Router>
    );
};

export default App;
