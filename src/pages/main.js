import React from 'react';
import { Switch, Route } from 'react-router-dom';

import home from './home';
import contact from './contact';
import challangeProposal from './challengeProposal';
import detailedPage from './detailedPage';
import challangeOverview from './challengeOverview';
import challangeOverview2 from './challengeOverview2';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/home' component={home}></Route>
      <Route exact path='/contact' component={contact}></Route>
      <Route exact path='/challangeProposal' component={challangeProposal}></Route>
      <Route exact path='/challangeOverview' component={challangeOverview}></Route>
      <Route exact path='/detailedPage' component={detailedPage}></Route>
      <Route exact path='/challangeOverview2' component={challangeOverview2}></Route>
    </Switch>
  );
}

export default Main;