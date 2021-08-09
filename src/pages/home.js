import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Homescreen = () => (
  <nav align="left">
    <div> 
      *This document is designed to more clearly define the digital transformation challenge you and your organization is facing. It will support us to better understand what you and your stakeholders (members, customers, patients, etc.) are dealing with and how digital solutions might help to address the challenge. In addition, we want to get an impression – as far as possible at this early stage – about your commitment to participate in the Digital Transformation Lab's challenge innovation process.*
    </div>
    <p>
      <NavLink to='/challangeProposal'>
        <Button variant="contained" color="primary">
          Propose a challenge
        </Button>
      </NavLink>
    </p>
    <p>
      <NavLink to='/contact'>
        <Button variant="contained" color="primary">
          Contact us via E-mail
        </Button>
      </NavLink>
    </p>
  </nav>
);

export default Homescreen;