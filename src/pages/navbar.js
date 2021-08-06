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
  <nav>
    <NavLink to='/'>Home</NavLink>&nbsp;&nbsp;&nbsp;
    <NavLink to='/challangeProposal'>Challenge intake</NavLink>&nbsp;&nbsp;&nbsp;
    <NavLink to='/challangeOverview'>Challenge overview</NavLink>&nbsp;&nbsp;&nbsp;
    <NavLink to='/detailedPage'>Detailed page</NavLink>
    <Button align="right"
      onClick={signOut}
    >
      {checkUser}
    </Button>
  </nav>
);

export default Navigation;