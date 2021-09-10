import React, { useEffect } from 'react';
import './App.css'

import { Switch, Route, Redirect } from 'react-router-dom';

import Admin from "./layouts/Admin.js";

import "./assets/css/material-dashboard-react.css?v=1.10.0";


function App() {
  useEffect(() => {
    document.title = "DTLab Challanges"
  }, [])
  return (
    <div className="App">
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/challenView" />
      </Switch>
    </div>
  );
}

export default App;