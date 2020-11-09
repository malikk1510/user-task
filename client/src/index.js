import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./data/reducers/index";
const reduxStore = createStore(rootReducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
