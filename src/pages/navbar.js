import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import detailedPage from '../pages/detailedPage';

const Navigation = () => (
  <nav>
    <ul>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/detailedPage'>detailedPage</NavLink></li>
      <li><NavLink to='/contact'>Contact</NavLink></li>
    </ul>
  </nav>
);

export default Navigation;