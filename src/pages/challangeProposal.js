import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { API } from 'aws-amplify';
import { listChallanges } from '../graphql/queries';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { createChallange as createChallangeMutation } from '../graphql/mutations';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100ch',
    },
  },
}));

const initialFormState = {  }

export default function ChallengeProposal() {
  const classes = useStyles();
  const [challanges, setChallanges] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  fetchChallanges(() => {
    fetchChallanges();
  }, []);

  async function fetchChallanges() {
    const apiData = await API.graphql({ query: listChallanges });
    setChallanges(apiData.data.listChallanges.items);
  }
  async function createChallange() {
    if (!formData.orgaLocat || !formData.orgaTitle
      // || !formData.coName || !formData.orgaWebsite || !formData.coEmail || 
      // !formData.coOptIn || !formData.chaStatem || !formData.coTitle || 
      // !formData.orgaMission || !formData.chaStak || !formData.chaBak || 
      // !formData.chaSup || !formData.critOfSuc || !formData.leadSup || !formData.nextStep
    ) {
      alert("Please fill in all the mandatory fields.");
      return;
    }
    await API.graphql({ query: createChallangeMutation, variables: { input: formData } });
    setChallanges([...challanges, formData]);
    setFormData(initialFormState);
  }
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div align="left">
        <p>PLEASE NOTE! As a public institution we publish the results of a challenge under an
          open source license to promote further innovation.</p>
        <TextField align="left" id="standard-required" label="Organazation's Name"
          onChange={e => setFormData({ ...formData, 'orgaTitle': e.target.value })}
          value={formData.orgaTitle}
        />
        <TextField align="left" id="standard-required" label="Organazation's City"
          onChange={e => setFormData({ ...formData, 'orgaLocat': e.target.value })}
          value={formData.orgaLocat}
        />
        <TextField align="left" id="standard-required" label="Author"
          onChange={e => setFormData({ ...formData, 'coName': e.target.value })}
          value={formData.coName}
        />
        <TextField align="left" id="standard-required" label="Organazation's Website"
          onChange={e => setFormData({ ...formData, 'orgaWebsite': e.target.value })}
          value={formData.orgaWebsite}
        />
        <TextField align="left" id="standard-required" label="Email"
          onChange={e => setFormData({ ...formData, 'coEmail': e.target.value })}
          value={formData.coEmail}
        />
        <TextField align="left" id="standard-required" label="Phone (optional)"
          onChange={e => setFormData({ ...formData, 'coPhone': e.target.value })}
          value={formData.coPhone}
        />
        <TextField align="left" id="standard-required" label="Would you like to opt-in for further communication, eg. the DTLab newsletter?"
          onChange={e => setFormData({ ...formData, 'coOptIn': e.target.value })}
          value={formData.coOptIn}
        />
        <TextField align="left" id="standard-required" label="Tell us a bit about your organization. What is its key mission (challenge statement)?"
          onChange={e => setFormData({ ...formData, 'chaStatem': e.target.value })}
          value={formData.chaStatem}
        />
        <TextField align="left" id="standard-required" label="Who are you and what is your role within the organization?"
          onChange={e => setFormData({ ...formData, 'coTitle': e.target.value })}
          value={formData.coTitle}
        />
        <TextField align="left" id="standard-required" label="Now, tell us about your challenge. What problem or opportunity would you like to address?"
          onChange={e => setFormData({ ...formData, 'orgaMission': e.target.value })}
          value={formData.orgaMission}
        />
        <TextField align="left" id="standard-required" label="Who are your customers/stakeholders-both intermediary (e.g. employees, faculty, volunteers) and end users (e.g. students, patients):"
          onChange={e => setFormData({ ...formData, 'chaStak': e.target.value })}
          value={formData.chaStak}
        />
        <TextField align="left" id="standard-required" label="Do you already try to solve this problem today? How?"
          onChange={e => setFormData({ ...formData, 'chaBak': e.target.value })}
          value={formData.chaBak}
        />
        <TextField align="left" id="standard-required" label="We cannot solve the problem without your help. Would you be willing and able to support (staff, data, etc.)? How?"
          onChange={e => setFormData({ ...formData, 'chaSup': e.target.value })}
          value={formData.chaSup}
        />
        <TextField align="left" id="standard-required" label="Let's imagine - we have been working on your challenge for a semester/term. How would you measure the success afterwards?"
          onChange={e => setFormData({ ...formData, 'critOfSuc': e.target.value })}
          value={formData.critOfSuc}
        />
        <TextField align="left" id="standard-required" label="It is important to us to drive actual impact. Do you have executive and leadership support for this challenge? Who is this?"
          onChange={e => setFormData({ ...formData, 'leadSup': e.target.value })}
          value={formData.leadSup}
        />
        <TextField align="left" id="standard-required" label="In your opinion, what are the next steps to implement a promising idea in reality/in your organization?"
          onChange={e => setFormData({ ...formData, 'nextStep': e.target.value })}
          value={formData.nextStep}
        />
      </div >
      <div align="left">
        <p>By creating a challenge, you are agreeing to our <a href="">Terms & Conditions</a>.</p>
        <Button onClick={createChallange} variant="contained" color="primary">
          Create Challange
        </Button>
      </div>
    </form>


  );
}
