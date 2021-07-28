import React from 'react';
import './App.css'

import Amplify from '@aws-amplify/core';
import awsmobile from './aws-exports';

import { withAuthenticator } from 'aws-amplify-react';

import Main from './pages/main';
import Navbar from './pages/navbar';

Amplify.configure(awsmobile);

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main />
    </div>
  );
}


export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
});