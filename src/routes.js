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
// core components/views for Admin layout
import challengeProposal from './pages/challengeProposal';
import challengeView from './pages/challengeView';
import printList from './pages/printList';

const dashboardRoutes = [
  {
    path: "/challengeProposal",
    name: "Propose a challenge",
    nameDE: "Challenge vorschlagen",
    icon: Unarchive,
    component: challengeProposal,
    layout: "/admin",
  },
  {
    path: "/challengeView",
    name: "Challenge overview",
    nameDE: "Übersicht der Challanges",
    icon: AssignmentIcon,
    component: challengeView,
    layout: "/admin",
  },
  {
    path: "/printList",
    name: "Print overview of the challenges",
    nameDE: "Druckübersicht der Challenges",
    icon: AssignmentIcon,
    component: printList,
    layout: "/admin",
  },
];
export default dashboardRoutes;
