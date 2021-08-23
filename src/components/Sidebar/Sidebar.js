/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import IconButton from '@material-ui/core/IconButton';
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  let location = useLocation();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return location.pathname === routeName;
  }
  const { color, image, routes, open } = props;

  return (
    <div>
      <Hidden smDown implementation="css">
        <SwipeableDrawer
          anchor="left"
          open={open}
          classes={{
            paper: classNames(classes.drawerPaper, {
            }),
          }}
        >
          <div className={classes.logo}>

          </div>
          <div className={classes.sidebarWrapper}>
            <IconButton className={classes.whiteFont} onClick={props.handleDrawerToggle}>
              <ChevronLeftIcon />
            </IconButton>
            <List className={classes.list}>
              {routes.map((prop, key) => {
                var activePro = " ";
                var listItemClasses;
                listItemClasses = classNames({
                  [" " + classes[color]]: activeRoute(prop.layout + prop.path),
                });
                const whiteFontClasses = classNames({
                  [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path),
                });
                return (
                  <NavLink
                    to={prop.layout + prop.path}
                    className={activePro + classes.item}
                    activeClassName="active"
                    key={key}
                    onClick={props.handleDrawerToggle}
                  >
                    <ListItem button className={classes.itemLink + listItemClasses}>
                      {typeof prop.icon === "string" ? (
                        <Icon
                          className={classNames(classes.itemIcon, whiteFontClasses, {
                          })}
                        >
                          {prop.icon}
                        </Icon>
                      ) : (
                        <prop.icon
                          className={classNames(classes.itemIcon, whiteFontClasses, {

                          })}
                        />
                      )}
                      <ListItemText
                        primary={prop.name}
                        className={classNames(classes.itemText, whiteFontClasses, {
                        })}
                        disableTypography={true}
                      />
                    </ListItem>
                  </NavLink>
                );
              })}
            </List>
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" + ")" }}
            />
          ) : null}
        </SwipeableDrawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
