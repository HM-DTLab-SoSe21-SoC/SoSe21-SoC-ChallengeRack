import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <ul>
      <li>
      <NavLink to='/challangeProposal'>Challenge intake</NavLink>&nbsp;&nbsp;&nbsp;
      <NavLink to='/challangeOverview'>Challenge overview</NavLink>&nbsp;&nbsp;&nbsp;
      <NavLink to='/detailedPage'>Detailed page</NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;