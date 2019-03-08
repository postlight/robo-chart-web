import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { randomColor } from 'randomcolor';
import App from './components/App';
import rootReducer from './reducers';
import { COLORS } from './constants';

const generateColors = num => {
  let colors = JSON.parse(localStorage.getItem(COLORS));
  if (!colors || colors.length < 300) {
    colors = [];
    for (let i = 0; i < num; i += 1) {
      colors.push(randomColor());
    }
    localStorage.setItem(COLORS, JSON.stringify(colors));
  }

  return colors;
};

const initialState = {
  chartData: {
    data: [],
    start: '',
    end: '',
    type: 'line',
    stacked: false,
    colors: generateColors(300),
    color: '',
    title: '',
    startFrom: 0,
    flipAxis: false,
  },
  sheetData: {
    sheetId: '',
    data: {},
    activeSheet: '',
    start: '',
    end: '',
  },
  appStatus: {
    fetchingData: false,
    authError: false,
    error: false,
  },
};
const store = createStore(rootReducer, initialState);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
