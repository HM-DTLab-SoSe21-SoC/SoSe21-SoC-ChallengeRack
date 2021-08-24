import {
  drawerWidth,
  transition,
  container,
} from "assets/jss/material-dashboard-react.js";

const appStyle = (theme) => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "80vh",
  },
    logo: {
    position: "relative",
    marginTop: "0px",
	paddingTop: "10px",
	paddingLeft: "30px",
	paddingRight: "30px",
  },
  navbar: {
    position: "relative",
    marginTop: "60px",
	paddingTop: "70px",
	paddingLeft: "30px",
	paddingRight: "30px",
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `100%`,
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
  },
  content: {
	      marginTop: "0px",
    padding: "0px 15px",
    minHeight: "calc(100vh - 123px)",
  },
  container,

});

export default appStyle;
