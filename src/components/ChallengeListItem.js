import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { API } from 'aws-amplify';
import { listChallanges } from '../graphql/queries';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { updateChallange as updateChallangeMutation, deleteChallange as deleteChallangeMutation } from '../graphql/mutations';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100ch',
    },
  },
}));

const DetailedPage = ({ challenge, deleteChallangeFunction, updateChallangeFunction }) => {
  const classes = useStyles();

  const { orgaTitle: challengeOrgaTitle, orgaLocat: challengeOrgaLocat, id } = challenge;

  const [orgaTitle, setTitle] = useState(challengeOrgaTitle);
  const [orgaLocat, setLocat] = useState(challengeOrgaLocat);

  const onEditButtonClick = () => {
    const updatedChallenge = { ...challenge, orgaTitle, orgaLocat };
    updateChallangeFunction(updatedChallenge);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">

      <div align="left">
          <div align="left">
            <input
              value={orgaTitle}
              onChange={(event) => setTitle(event.target.value)}
            />
            <h1>General</h1>
            <TextField required id="standard-size-normal" label="Phase"
              onChange={event => setLocat(event.target.value)}
              value={orgaLocat}
            />
            <div>
              <Button onClick={updateChallangeFunction} variant="contained" color="primary">
                Update challenge data
              </Button>&nbsp;&nbsp;&nbsp;
              <Button onClick={() => deleteChallangeFunction(id)} variant="contained" color="primary">
                Delete challenge
              </Button>&nbsp;&nbsp;&nbsp;
            </div>
          </div>
      </div>
    </form>
  );
};


export default DetailedPage;
