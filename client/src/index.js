import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MagicMirror from './MagicMirror';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <MagicMirror />
  </Provider>
, document.getElementById('root'));
