import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { createStore,applyMiddleware } from "redux";
import rootReducer from "./data/reducers";
import thunk from 'redux-thunk'

const reduxStore = createStore(rootReducer,applyMiddleware(thunk));


ReactDOM.render(
  <BrowserRouter>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
