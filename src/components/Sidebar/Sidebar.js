/*eslint-disable*/
import React, { useState, useEffect } from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Auth from '@aws-amplify/auth';

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  let location = useLocation();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return location.pathname === routeName;
  }
  const { color, image, routes, open } = props;
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('-');

  useEffect(() => {
    try {
      setError(null);
      Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then(user => {
        setUsername(user.username);
        console.log(`Load additional settings for user: ${user.username}`);
        // TBD
      }).catch(err => setError(err));
    }
    catch (e) {
      setError(e);
    }
  }, []);
  const signOut = () => {
    props.handleDrawerToggle();
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
    //window.location.reload(false);
  }
  return (
    <div>
      <Hidden smDown implementation="css">
        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classNames(classes.drawerPaper, {
            }),
          }}
        >
          <div className={classes.logo} align="right">
            <label className={classes.whiteFont}>
              {username}
            </label>
            <IconButton
              className={classes.whiteFont}
              color="inherit"
              aria-label="open drawer"
              onClick={signOut}
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
          <div className={classes.sidebarWrapper}>
            <List className={classes.list}>
              <ListItem
                button
                className={classes.whiteFont}
                onClick={props.handleDrawerToggle}>
                <Icon >
                  <ChevronLeftIcon />
                </Icon>
                <ListItemText
                  primary=" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                  className={classes.itemText}
                  disableTypography={true}
                />
              </ListItem>
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
                        primary={!props.language ? prop.nameDE : prop.name}
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
