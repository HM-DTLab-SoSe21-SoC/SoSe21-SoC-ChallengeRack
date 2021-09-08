import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { updateChallenge as updateChallengeMutation } from '../graphql/mutations';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100ch',
    },
  },
  root2: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
  details: {
    padding: "15px",
  },
}));


const DetailedPage = ({ props, handleHide, challenge, fetchChallenges, deleteChallenge }) => {
  const initialFormState = {
    id: challenge.id,
    phase: challenge.phase,
    status: challenge.status,
    coName: challenge.coName,
    coTitle: challenge.coTitle,
    coEmail: challenge.coEmail,
    coPhone: challenge.coPhone,
    coOptIn: challenge.coOptIn,
    orgaTitle: challenge.orgaTitle,
    orgaLocat: challenge.orgaLocat,
    orgaMission: challenge.orgaMission,
    orgaWebsite: challenge.orgaWebsite,
    orgaDate: challenge.orgaDate,
    chaStatem: challenge.chaStatem,
    chaDes: challenge.chaDes,
    chaStak: challenge.chaStak,
    chaBac: challenge.chaBac,
    chaSup: challenge.chaSup,
    leadSup: challenge.leadSup,
    critOfSuc: challenge.critOfSuc,
    nextStep: challenge.nextStep,
    chatitle: challenge.chatitle,
    theme: challenge.theme,
    technology: challenge.technology,
    repu: challenge.repu,
    feasibil: challenge.feasibil,
    impact: challenge.impact,
    scalabil: challenge.scalabil,
    aligment: challenge.aligment,
    prototype: challenge.prototype,
    score: challenge.prototype,
    type: challenge.type,
    comment: challenge.comment,
    faculty: challenge.faculty,
    prof: challenge.prof,
    matchEmail: challenge.matchEmail,
    numberOfT: challenge.numberOfT,
    numberOfS: challenge.numberOfS,
    startDate: challenge.startDate,
    endDate: challenge.endDate,
    cohort: challenge.cohort,
    milestone: challenge.milestone,
    publURL: challenge.publURL,
    gitHubURL: challenge.gitHubURL,
  }
  const classes = useStyles();

  const [formData, setFormData] = useState(initialFormState);
  const updateChallenge = async (event) => {
    await API.graphql({ query: updateChallengeMutation, variables: { input: formData } });
  }
  return (
    <form className={classes.details} noValidate autoComplete="off">
      <div>
        <div>
          <Button onClick={() => { fetchChallenges(); handleHide(); }} variant="contained" color="primary">
            {!props.language ? "Zurück zur Übersicht" : "Back to the overview"}
          </Button>&nbsp;&nbsp;&nbsp;
          <Button onClick={() => { updateChallenge(); fetchChallenges(); }} variant="contained" color="primary">
            {!props.language ? "Challaenge-Daten übernehmen" : "Update challenge data"}
          </Button>&nbsp;&nbsp;&nbsp;
          <Button onClick={() => { deleteChallenge(challenge); handleHide(); }} variant="contained" color="primary">
            {!props.language ? "Challenge löschen" : "Delete challenge"}
          </Button>&nbsp;&nbsp;&nbsp;

        </div>
        <div className={classes.root2}>
          <h1>
            {!props.language ? "Allgemein" : "General"}
          </h1>
          <TextField required id="standard-size-normal" label="ID"
            onChange={e => setFormData({ ...formData, 'id': e.target.value })}
            value={formData.id}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField required id="standard-size-normal" label="Phase"
            onChange={e => setFormData({ ...formData, 'phase': e.target.value })}
            value={formData.phase}
          />
          <TextField required id="standard-size-normal" label="Status"
            onChange={e => setFormData({ ...formData, 'status': e.target.value })}
            value={formData.status}
          />
          <p> </p>
        </div>
        <div className={classes.root}>
          <h1>
            {!props.language ? "Kontakt" : "Contact"}
          </h1>
          <TextField required id="standard-size-normal" label={!props.language ? "Kontakt Name" : "Contact Name"}
            onChange={e => setFormData({ ...formData, 'coName': e.target.value })}
            value={formData.coName}
          />
          <TextField required id="standard-size-normal" label={!props.language ? "Kontakt Titel" : "Contact Title"}
            onChange={e => setFormData({ ...formData, 'coTitle': e.target.value })}
            value={formData.coTitle}
          />
          <TextField align="left" id="standard-required" label={!props.language ? "Kontakt Email" : "Contact Email"}
            onChange={e => setFormData({ ...formData, 'coEmail': e.target.value })}
            value={formData.coEmail}
          />
          <TextField align="left" id="standard-required" label={!props.language ? "Kontakt Telefon" : "Contact Phone"}
            onChange={e => setFormData({ ...formData, 'coPhone': e.target.value })}
            value={formData.coPhone}
          />
          <TextField required id="standard-size-normal" label={!props.language ? "Einverständniserklärung" : "Contact Opt-In"}
            onChange={e => setFormData({ ...formData, 'status': e.target.value })}
            value={formData.coOptIn}
          />
          <p> </p>
        </div>
        <div className={classes.root}>
          <h1>
            {!props.language ? "Organisation" : "Organization"}
          </h1>
          <TextField align="left" id="standard-required" label={!props.language ? "Name der Organisation" : "Organazation's Name"}
            onChange={e => setFormData({ ...formData, 'orgaTitle': e.target.value })}
            value={formData.orgaTitle}
          />
          <TextField align="left" id="standard-required" label={!props.language ? "Standort der Organisation" : "Organazation's Location"}
            onChange={e => setFormData({ ...formData, 'orgaLocat': e.target.value })}
            value={formData.orgaLocat}
          />
          <TextField align="left" id="standard-required" label={!props.language ? "Auftrag der Organisation" : "Organazation's Mission"}
            onChange={e => setFormData({ ...formData, 'orgaMission': e.target.value })}
            value={formData.orgaMission}
          />
          <TextField align="left" id="standard-required" label={!props.language ? "Webseite der Organisation" : "Organazation's Website"}
            onChange={e => setFormData({ ...formData, 'orgaWebsite': e.target.value })}
            value={formData.orgaWebsite}
          />
          <TextField align="left" id="standard-required" label={!props.language ? "Erstellungsdatum der Challenge" : "Submission Date"}
            onChange={e => setFormData({ ...formData, 'orgaDate': e.target.value })}
            value={formData.orgaDate}
          />
        </div>
      </div>
    </form>
  );
};


export default DetailedPage;
