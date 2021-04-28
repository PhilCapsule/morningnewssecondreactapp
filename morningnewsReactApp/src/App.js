import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import ScreenHome from './ScreenHome';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';
import ScreenArticlesBySource from './ScreenArticlesBySource';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ScreenHome} />
        <Route path="/screensource" component={ScreenSource} />
        <Route path="/screenarticlesbysource/:id" component={ScreenArticlesBySource} />
        <Route path="/screenmyarticles" component={ScreenMyArticles} />
      </Switch>
    </Router>
  );
}

export default App;
