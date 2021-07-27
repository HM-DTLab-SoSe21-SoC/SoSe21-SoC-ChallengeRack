import React, { useState, useEffect } from 'react';
import './App.css'

import Amplify from '@aws-amplify/core';
import awsmobile from './aws-exports';
import { API } from 'aws-amplify';
import { listChallanges } from './graphql/queries';

import { withAuthenticator } from 'aws-amplify-react';
import { NavLink, Switch, Route } from 'react-router-dom';

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