import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Container from './Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>
, document.getElementById('root'));
