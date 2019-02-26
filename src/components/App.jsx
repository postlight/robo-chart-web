import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Home from '../screens/Home';
import PageNotFound from '../screens/PageNotFound';
import About from '../screens/About';
import '../styles/App.scss';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
};

export default App;
