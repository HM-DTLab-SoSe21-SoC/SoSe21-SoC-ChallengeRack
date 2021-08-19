/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Unarchive from "@material-ui/icons/Unarchive";
import AssignmentIcon from '@material-ui/icons/Assignment';
// core components/views for Admin layout
import UserProfile from "views/UserProfile/UserProfile.js";

import home from './pages/home';
import contact from './pages/contact';
import challangeProposal from './pages/challengeProposal';
import detailedPage from './pages/detailedPage';
import challangeOverview from './pages/challengeOverview';

const dashboardRoutes = [
  {
    path: "/challangeProposal",
    name: "Propose a challenge",
    icon: Unarchive,
    component: challangeProposal,
    layout: "/admin",
  },
  {
    path: "/home",
    name: "Propose a challenge",
    icon: Unarchive,
    component: home,
    layout: "/admin",
  },
  {
    path: "/challangeOverview",
    name: "Challange overview",
    icon: AssignmentIcon,
    component: challangeOverview,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
];
export default dashboardRoutes;
