import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import PDF from './components/PDF/PDF';
import PDFRotate from './components/PDFRotate/PDFRotate';
import PDFDelete from './components/PDFDelete/PDFDelete';
import PDFSplit from './components/PDFSplit/PDFSplit';
import PDFUnion from './components/PDFUnion/PDFUnion';
import PDFConvert from './components/PDFConvert/PDFConvert';

import './App.css';

function App() {
    return (
        <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/union" component={PDFUnion} />
                <Route path="/delete" component={PDFDelete} />
                <Route path="/split" component={PDFSplit} />
                <Route path="/rotate" component={PDFRotate} />
                <Route path="/archive" component={PDFConvert} />
            </Switch>
        </Layout>
    );
}

export default App;
