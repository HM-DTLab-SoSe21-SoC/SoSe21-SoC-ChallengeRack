import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App /> {/* The various pages will be displayed by the `Main` component. */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
