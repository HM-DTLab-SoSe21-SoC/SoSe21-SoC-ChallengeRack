import React, { Component } from 'react';
import './App.css'

import Amplify from '@aws-amplify/core';
import awsmobile from './aws-exports';
import { API, graphqlOperation } from 'aws-amplify';
import { listChallanges } from './graphql/queries';

import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(awsmobile);

class App extends Component {
  state = { challanges: [] }
  async componentDidMount() {
    const data = await API.graphql(graphqlOperation(listChallanges))
    this.setState({
      challanges: data.data.listChallanges.items
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.challanges.map((challange, index) => (<p key={index}>
          {challange.content}   {challange.id}
          </p>))}
      </div >
    );
  }
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
});