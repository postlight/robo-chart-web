import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Footer from './Footer';
import Home from '../screens/Home';
import '../styles/App.scss';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
