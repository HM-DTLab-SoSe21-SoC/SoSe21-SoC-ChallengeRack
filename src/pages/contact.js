import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { API } from 'aws-amplify';
import { listChallenges } from '../graphql/queries';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { createChallenge as createChallengeMutation} from '../graphql/mutations';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100ch',
    },
  },
}));


const initialFormState = { id: '', orgaTitle: '' }

export default function DataGridDemo() {
  const classes = useStyles();
  const [challenges, setChallenges] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchChallenges();
  }, []);

  async function fetchChallenges() {
    const apiData = await API.graphql({ query: listChallenges });
    setChallenges(apiData.data.listChallenges.items);
  }
  async function createChallenge() {
    if (!formData.orgaLocat || !formData.orgaTitle
      // || !formData.coName || !formData.orgaWebsite || !formData.coEmail || 
      // !formData.coOptIn || !formData.chaStatem || !formData.coTitle || 
      // !formData.orgaMission || !formData.chaStak || !formData.chaBak || 
      // !formData.chaSup || !formData.critOfSuc || !formData.leadSup || !formData.nextStep
    ) {
      alert("Please fill in all the mandatory fields.");
      return;
    }
    await API.graphql({ query: createChallengeMutation, variables: { input: formData } });
    setChallenges([...challenges, formData]);
    setFormData(initialFormState);
  }
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div align="left">
        <h1>Contact Us</h1>
        <p>Feel free to reach us out at <a href="mailto:dtlab@hmu.edu">dtl@hmu.edu</a>, or fill out the form below.</p>
        <TextField align="left" required id="standard-required" label="ID"
          onChange={e => setFormData({ ...formData, 'id': e.target.value })}
          value={formData.id}
        />
        <TextField align="left" id="standard-required" label="Organazation's Name"
          onChange={e => setFormData({ ...formData, 'orgaTitle': e.target.value })}
          value={formData.orgaTitle}
        />
      </div >
      <div align="left">
        <Button onClick={createChallenge} variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>


  );
}
