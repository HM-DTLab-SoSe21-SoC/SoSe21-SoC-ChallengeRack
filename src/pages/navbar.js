import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <NavLink to='/'>Home</NavLink>&nbsp;&nbsp;&nbsp;
    <NavLink to='/challangeProposal'>Challenge intake</NavLink>&nbsp;&nbsp;&nbsp;
    <NavLink to='/challangeOverview'>Challenge overview</NavLink>&nbsp;&nbsp;&nbsp;
    <NavLink to='/detailedPage'>Detailed page</NavLink>
  </nav>
);

export default Navigation;