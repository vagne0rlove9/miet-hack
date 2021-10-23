import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/Home/Home';
import PDF from './components/PDF/PDF';

import './App.css';

function App() {
    return (
        <div className="main-container">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/union" component={PDF} />
                <Route path="/delete" component={PDF} />
                <Route path="/split" component={PDF} />
                <Route path="/rotate" component={PDF} />
                <Route path="/archive" component={PDF} />
            </Switch>
        </div>
    );
}

export default App;
