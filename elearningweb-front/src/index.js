import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './StateProvider';
import { initialState } from './reducer';
import reducer from './reducer';
import {Provider} from 'react-redux';
import store from './store';
import { CookiesProvider } from 'react-cookie';
ReactDOM.render(
  <React.StrictMode>
     <CookiesProvider>
    <Provider store = {store}>
    <App />
    </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

