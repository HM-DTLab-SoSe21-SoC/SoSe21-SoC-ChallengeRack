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

const initialFormState = { id: '', orgaTitle: '' }

export default function DataGridDemo() {
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
  async function updateChallange() {
    await API.graphql({ query: updateChallangeMutation, variables: { input: formData } });
    setChallanges([...challanges, formData]);
    setFormData(initialFormState);
  }
  async function deleteChallange({ id }) {
    const newChallengesArray = challanges.filter(challange => challange.id !== id);
    setChallanges(newChallengesArray);
    await API.graphql({ query: deleteChallangeMutation, variables: { input: { id } } });
  }
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div align="left">
        {challanges.map((challange) => (
          <div align="left">
            <Button onClick={updateChallange} variant="contained" color="primary">
              Update challenge data
            </Button>&nbsp;&nbsp;&nbsp;
            <Button onClick={() => deleteChallange(challange)} variant="contained" color="primary">
              Delete challenge
            </Button>&nbsp;&nbsp;&nbsp;
            <NavLink to='/challangeOverview'>
              <Button variant="contained" color="primary">
                Back to overview
              </Button>
            </NavLink>
            <p> </p>
            <h1>General</h1>
            <TextField required id="standard-size-normal" label="ID" placeholder={challange.id}
              onChange={e => setFormData({ ...formData, 'id': e.target.value })}
              value={formData.id}
            />
            <TextField required id="standard-size-normal" label="Phase" placeholder={challange.phase}
              onChange={e => setFormData({ ...formData, 'phase': e.target.value })}
              value={formData.phase}
            />
            <TextField required id="standard-size-normal" label="Status" placeholder={challange.status}
              onChange={e => setFormData({ ...formData, 'status': e.target.value })}
              value={formData.status}
            />
            <p> </p>
            <h1>Contact</h1>
            <TextField required id="standard-size-normal" label="Contact Name" placeholder={challange.coName}
              onChange={e => setFormData({ ...formData, 'coName': e.target.value })}
              value={formData.coName}
            />
            <TextField required id="standard-size-normal" label="Contact Title" placeholder={challange.coTitle}
              onChange={e => setFormData({ ...formData, 'coTitle': e.target.value })}
              value={formData.coTitle}
            />
            <TextField align="left" id="standard-required" label="Contact Email" placeholder={challange.coEmail}
              onChange={e => setFormData({ ...formData, 'coEmail': e.target.value })}
              value={formData.coEmail}
            />
            <TextField align="left" id="standard-required" label="Contact Phone" placeholder={challange.coPhone}
              onChange={e => setFormData({ ...formData, 'coPhone': e.target.value })}
              value={formData.coPhone}
            />
            <TextField required id="standard-size-normal" label="Contact Opt-In" placeholder={challange.status}
              onChange={e => setFormData({ ...formData, 'status': e.target.value })}
              value={formData.coOptIn}
            />
            <p> </p>
            <h1>Organization</h1>
            <TextField align="left" id="standard-required" label="Organazation's Title" placeholder={challange.orgaTitle}
              onChange={e => setFormData({ ...formData, 'orgaTitle': e.target.value })}
              value={formData.orgaTitle}
            />
            <TextField align="left" id="standard-required" label="Organazation's Location" placeholder={challange.orgaLocat}
              onChange={e => setFormData({ ...formData, 'orgaLocat': e.target.value })}
              value={formData.orgaLocat}
            />
            <TextField align="left" id="standard-required" label="Organazation's Mission" placeholder={challange.orgaMission}
              onChange={e => setFormData({ ...formData, 'orgaMission': e.target.value })}
              value={formData.orgaMission}
            />
            <TextField align="left" id="standard-required" label="Organazation's Website" placeholder={challange.orgaWebsite}
              onChange={e => setFormData({ ...formData, 'orgaWebsite': e.target.value })}
              value={formData.orgaWebsite}
            />
            <TextField align="left" id="standard-required" label="Organazation's Date" placeholder={challange.orgaDate}
              onChange={e => setFormData({ ...formData, 'orgaDate': e.target.value })}
              value={formData.orgaDate}
            />
            <p> </p>
            <h1>Organization</h1>
            <TextField align="left" id="standard-required" label="Challange Statement" placeholder={challange.chaStatem}
              onChange={e => setFormData({ ...formData, 'chaStatem': e.target.value })}
              value={formData.chaStatem}
            />
            <TextField align="left" id="standard-required" label="Challange Description" placeholder={challange.chaDes}
              onChange={e => setFormData({ ...formData, 'chaDes': e.target.value })}
              value={formData.chaDes}
            />
            <TextField align="left" id="standard-required" label="Challange Stakeholder" placeholder={challange.chaStak}
              onChange={e => setFormData({ ...formData, 'chaStak': e.target.value })}
              value={formData.chaStak}
            />
            <TextField align="left" id="standard-required" label="Challange Background" placeholder={challange.chaBac}
              onChange={e => setFormData({ ...formData, 'chaBac': e.target.value })}
              value={formData.chaBac}
            />
            <TextField align="left" id="standard-required" label="Challange Support" placeholder={challange.chaSup}
              onChange={e => setFormData({ ...formData, 'chaSup': e.target.value })}
              value={formData.chaSup}
            />
            <TextField align="left" id="standard-required" label="Leadership Support" placeholder={challange.leadSup}
              onChange={e => setFormData({ ...formData, 'leadSup': e.target.value })}
              value={formData.leadSup}
            />
            <TextField align="left" id="standard-required" label="Criteria of Success" placeholder={challange.critOfSuc}
              onChange={e => setFormData({ ...formData, 'critOfSuc': e.target.value })}
              value={formData.critOfSuc}
            />
            <TextField align="left" id="standard-required" label="Next Steps" placeholder={challange.nextStep}
              onChange={e => setFormData({ ...formData, 'nextStep': e.target.value })}
              value={formData.nextStep}
            />
          </div>
        ))}
      </div>
    </form>


  );
}
