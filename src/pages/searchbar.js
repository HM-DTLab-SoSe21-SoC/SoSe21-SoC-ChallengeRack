/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import IconButton from '@material-ui/core/IconButton';
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { Button, Avatar } from '@material-ui/core';
import Search from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  
}));
const Searchbar = ({ setchallSearch }) => {
  const classes = useStyles();
  const [search, setSearch] = useState([]);
  useEffect(() => {

  }, []);
  const handleSearch = (event) => {
    if (search == "") {
      setchallSearch(null);
    } else {
      setchallSearch("search");
    }
  };
  return (
    <div>
      <div className={classes.searchWrapper}>
        <TextField
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          placeholder="Search..."
        />
        <Button onClick={handleSearch} color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div>
    </div>
  );
}
export default Searchbar;