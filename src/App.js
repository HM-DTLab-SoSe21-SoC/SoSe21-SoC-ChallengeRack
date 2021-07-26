import React from 'react';

import Amplify from '@aws-amplify/core';
import awsmobile from './aws-exports';

import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(awsmobile);

function App() {
  return (
    <h1>
      Hello World!
    </h1>
  );
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
});