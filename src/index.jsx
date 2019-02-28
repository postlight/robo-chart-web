import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './reducers';

const initialState = {
  chartData: {
    data: [],
    start: '',
    end: '',
  },
  sheetData: {
    sheetId: '',
    data: {},
    activeSheet: '',
    start: '',
    end: '',
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
