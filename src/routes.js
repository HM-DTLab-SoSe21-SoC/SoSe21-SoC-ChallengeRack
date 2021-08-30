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
import Unarchive from "@material-ui/icons/Unarchive";
import AssignmentIcon from '@material-ui/icons/Assignment';
import BurstModeIcon from '@material-ui/icons/BurstMode';
// core components/views for Admin layout
import challengeProposal from './pages/challengeProposal';
import challengeOverview from './pages/challengeOverview';
import challengeGallery from './pages/challengeGallery';

const dashboardRoutes = [
  {
    path: "/challengeProposal",
    name: "Propose a challenge",
    icon: Unarchive,
    component: challengeProposal,
    layout: "/admin",
  },
  {
    path: "/challengeOverview",
    name: "Challenge overview",
    icon: AssignmentIcon,
    component: challengeOverview,
    layout: "/admin",
  },
  {
    path: "/challengeGallery",
    name: "Challenge gallery",
    icon: BurstModeIcon,
    component: challengeGallery,
    layout: "/admin",
  },
];
export default dashboardRoutes;
