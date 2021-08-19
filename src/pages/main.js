import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import home from './home';
import contact from './contact';
import challangeProposal from './challengeProposal';
import detailedPage from './detailedPage';
import challangeOverview from './challengeOverview';

import Admin from "../layouts/Admin.js";
import RTL from "../layouts/RTL.js";

import "../assets/css/material-dashboard-react.css?v=1.10.0";

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/home' component={home}></Route>
      <Route exact path='/contact' component={contact}></Route>
      <Route exact path='/challangeProposal' component={challangeProposal}></Route>
      <Route exact path='/detailedPage' component={detailedPage}></Route>
      <Route exact path='/challangeOverview' component={challangeOverview}></Route>
      <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Redirect from="/" to="/admin/challangeOverview" />
    </Switch>
  );
}

export default Main;