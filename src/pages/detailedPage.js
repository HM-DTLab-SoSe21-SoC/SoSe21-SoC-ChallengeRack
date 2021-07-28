import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { API } from 'aws-amplify';
import { listChallanges } from '../graphql/queries';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { createChallange as createChallangeMutation, deleteChallange as deleteChallangeMutation } from '../graphql/mutations';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
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
  async function createChallange() {
    if (!formData.id || !formData.orgaCity || !formData.orgaTitle) return;
    await API.graphql({ query: createChallangeMutation, variables: { input: formData } });
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
      <TextField required id="standard-required" label="Required" defaultValue={formData.id} />
      <TextField required id="standard-required" label="ID" 
        onChange={e => setFormData({ ...formData, 'id': e.target.value })}
        value={formData.id}
      />
      <TextField id="standard-basic" label="Organazation City"
        onChange={e => setFormData({ ...formData, 'orgaCity': e.target.value })}
        value={formData.orgaCity}
      />
      <TextField id="standard-basic" label="Organazation Title"
        onChange={e => setFormData({ ...formData, 'orgaTitle': e.target.value })}
        value={formData.orgaTitle}
      />
      <button onClick={createChallange}>Create Challange</button>
      <div style={{ marginBottom: 30 }}>
        {
          challanges.map(challange => (
            <div key={challange.id || challange.orgaTitle}>
              <h2>{challange.orgaTitle}</h2>
              <p>{challange.orgaCity}</p>
              <button onClick={() => deleteChallange(challange)}>Delete challange</button>
            </div>
          ))
        }
      </div>
    </form>


  );
}