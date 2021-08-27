import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listChallenges } from '../graphql/queries';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { createChallenge as createChallengeMutation } from '../graphql/mutations';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
  root2: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '80ch',
    },
  },
  form: {
    padding: "15px",
  },
}));

const initialFormState = {
  phase: "",
  status: "",
  coName: "",
  coTitle: "",
  coEmail: "",
  coPhone: "",
  coOptIn: "",
  orgaTitle: "",
  orgaLocat: "",
  orgaMission: "",
  orgaWebsite: "",
  orgaDate: "",
  chaStatem: "",
  chaDes: "",
  chaStak: "",
  chaBac: "",
  chaSup: "",
  leadSup: "",
  critOfSuc: "",
  nextStep: "",
  chatitle: "",
  theme: "",
  technology: "",
  repu: "",
  feasibil: "",
  impact: "",
  scalabil: "",
  aligment: "",
  prototype: "",
  score: "",
  type: "",
  comment: "",
  faculty: "",
  prof: "",
  matchEmail: "",
  numberOfT: "",
  numberOfS: "",
  startDate: "",
  endDate: "",
  cohort: "",
  milestone: "",
  publURL: "",
  gitHubURL: "",
}

export default function ChallengeProposal() {
  const classes = useStyles();
  const [challenges, setChallenges] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [apiError, setApiError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchChallenges();
  }, []);

  async function fetchChallenges() {
    setIsLoading(true);
    try {
      const apiData = await API.graphql(graphqlOperation(listChallenges));
      const challenges = apiData.data.listChallenges.items;
      setChallenges(challenges);
      setApiError(null);
    } catch (error) {
      console.error('Failed fetching challenges:', error);
      setApiError(error);
    } finally {
      setIsLoading(false);
    }
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
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form noValidate autoComplete="off" className={classes.form}>
          <div align="left">
            PLEASE NOTE! As a public institution we publish the results of a challenge under an
            open source license to promote further innovation.
            <div className={classes.root}>
              <div>
                <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label="Organazation's Name"
                  onChange={e => setFormData({ ...formData, 'orgaTitle': e.target.value })}
                  value={formData.orgaTitle}
                />
              </div>
              <div>
                <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label="Organazation's City"
                  onChange={e => setFormData({ ...formData, 'orgaLocat': e.target.value })}
                  value={formData.orgaLocat}
                />
              </div>
              <div>
                <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label="Author"
                  onChange={e => setFormData({ ...formData, 'coName': e.target.value })}
                  value={formData.coName}
                />
              </div>
              <div>
                <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label="Organazation's Website"
                  onChange={e => setFormData({ ...formData, 'orgaWebsite': e.target.value })}
                  value={formData.orgaWebsite}
                />
              </div>
              <div>
                <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label="Email"
                  onChange={e => setFormData({ ...formData, 'coEmail': e.target.value })}
                  value={formData.coEmail}
                />
              </div>
              <div>
                <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label="Phone (optional)"
                  onChange={e => setFormData({ ...formData, 'coPhone': e.target.value })}
                  value={formData.coPhone}
                />
              </div>
            </div>
            <div className={classes.root2}>
              <div>
                <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label="Would you like to opt-in for further communication, eg. the DTLab newsletter?"
                  onChange={e => setFormData({ ...formData, 'coOptIn': e.target.value })}
                  value={formData.coOptIn}
                />
              </div>
              <div>
                <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label="Tell us a bit about your organization. What is its key mission (challenge statement)?"
                  onChange={e => setFormData({ ...formData, 'chaStatem': e.target.value })}
                  value={formData.chaStatem}
                  variant="outlined"
                />
              </div>
              <div>
                <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label="Who are you and what is your role within the organization?"
                  onChange={e => setFormData({ ...formData, 'coTitle': e.target.value })}
                  value={formData.coTitle}
                  variant="outlined"
                />
              </div>
              <div>
                <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label="Now, tell us about your challenge. What problem or opportunity would you like to address?"
                  onChange={e => setFormData({ ...formData, 'orgaMission': e.target.value })}
                  value={formData.orgaMission}
                  variant="outlined"
                />
              </div>
              <div>
                <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label="Who are your customers/stakeholders-both intermediary (e.g. employees, faculty, volunteers) and end users (e.g. students, patients):"
                  onChange={e => setFormData({ ...formData, 'chaStak': e.target.value })}
                  value={formData.chaStak}
                  variant="outlined"
                />
              </div>
              <div>
                <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label="Do you already try to solve this problem today? How?"
                  onChange={e => setFormData({ ...formData, 'chaBak': e.target.value })}
                  value={formData.chaBak}
                  variant="outlined"
                />
              </div>
              <div>
                <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label="We cannot solve the problem without your help. Would you be willing and able to support (staff, data, etc.)? How?"
                  onChange={e => setFormData({ ...formData, 'chaSup': e.target.value })}
                  value={formData.chaSup}
                  variant="outlined"
                />
              </div>
              <div>
                <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label="Let's imagine - we have been working on your challenge for a semester/term. How would you measure the success afterwards?"
                  onChange={e => setFormData({ ...formData, 'critOfSuc': e.target.value })}
                  value={formData.critOfSuc}
                  variant="outlined"
                />
              </div>
              <div>
                <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label="It is important to us to drive actual impact. Do you have executive and leadership support for this challenge? Who is this?"
                  onChange={e => setFormData({ ...formData, 'leadSup': e.target.value })}
                  value={formData.leadSup}
                  variant="outlined"
                />
              </div>
              <div>
                <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label="In your opinion, what are the next steps to implement a promising idea in reality/in your organization?"
                  onChange={e => setFormData({ ...formData, 'nextStep': e.target.value })}
                  value={formData.nextStep}
                  variant="outlined"
                />
              </div>
            </div>
          </div >
          <div align="left">
            <p>The DTLab is part of the innovation network M:UniverCity at Munich University of Applied Sciences, which organizes CoCreation projects with partners from science, business, civil society and politics.
              <a href="https://hm.edu/munivercity/">https://hm.edu/munivercity/</a>
              By participating in a Challenge, your organization becomes becomes a member of M:UniverCity at the same time. No obligations arise from the membership.
            </p>
            <NavLink to='/admin/challangeOverview'>
              <Button onClick={() => { createChallenge(); fetchChallenges(); }} variant="contained" color="primary">
                Create Challenge
              </Button>
            </NavLink>
          </div>
        </form>
      </Paper>
    </div>

  );
}
