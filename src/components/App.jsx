import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Footer from './Footer';
import Home from '../screens/Home';
import '../styles/App.scss';

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

export default App;
