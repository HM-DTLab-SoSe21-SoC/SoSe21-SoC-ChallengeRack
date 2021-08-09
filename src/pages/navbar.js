import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Auth from '@aws-amplify/auth';

function checkUser() {
  Auth.currentAuthenticatedUser()
    .then(user => console.log({ user }))
    .catch(err => console.log(err))
}

const signOut = () => {
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

const Navigation = () => (
  <dev>
    <nav align="left">
      <NavLink to='/'>Challenge intake</NavLink>&nbsp;&nbsp;&nbsp;
      <NavLink to='/challangeOverview'>Challenge overview</NavLink>&nbsp;&nbsp;&nbsp;
    </nav>
  </dev>
);

export default Navigation;