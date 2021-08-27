import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Admin from "../layouts/Admin.js";

import "../assets/css/material-dashboard-react.css?v=1.10.0";

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route path="/admin" component={Admin} />
      <Redirect from="/" to="/admin/challengeOverview" />
    </Switch>
  );
}

export default Main;