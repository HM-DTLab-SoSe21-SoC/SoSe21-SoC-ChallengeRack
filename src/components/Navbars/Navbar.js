import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import Button from '@material-ui/core/Button';

//hooks
import { useRouteName } from "hooks";
import MenuIcon from '@material-ui/icons/Menu';
import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });
  return (
    <div>
      <AppBar className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <IconButton
            align="left"
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.flex}>
            {/* Here we create navbar brand, based on route name */}

          </div>
          <Hidden smDown implementation="css">
            {/*<AdminNavbarLinks />*/}
          </Hidden>
          <Button onClick={() => { props.setlanguage(false) }}>DE</Button>
        <Button onClick={() => { props.setlanguage(true) }}>EN</Button>
          <Hidden mdUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={props.handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
