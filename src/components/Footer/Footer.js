/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="https://sites.hm.edu/dt_lab/index.en.html" className={classes.block}>
                DTLab Homepage
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://sites.hm.edu/dt_lab/ueber_uns/about-us.en.html" className={classes.block}>
                About us
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://sites.hm.edu/dt_lab/kontakt_2/kontaktseite.en.html" className={classes.block}>
                Contact
              </a>
            </ListItem>
          </List>
        </div>
        
      </div>
    </footer>
  );
}
