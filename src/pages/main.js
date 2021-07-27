import React from 'react';
import { Switch, Route } from 'react-router-dom';

import detailedPage from '../pages/detailedPage';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/detailedPage' component={detailedPage}></Route>
    </Switch>
  );
}

export default Main;