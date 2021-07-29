import React from 'react';
import { Switch, Route } from 'react-router-dom';

import home from '../pages/home';
import contact from '../pages/contact';
import challangeProposal from '../pages/challangeProposal';
import detailedPage from '../pages/detailedPage';
import challangeOverview from '../pages/challangeOverview';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={home}></Route>
      <Route exact path='/contact' component={contact}></Route>
      <Route exact path='/challangeProposal' component={challangeProposal}></Route>
      <Route exact path='/challangeOverview' component={challangeOverview}></Route>
      <Route exact path='/detailedPage' component={detailedPage}></Route>
    </Switch>
  );
}

export default Main;