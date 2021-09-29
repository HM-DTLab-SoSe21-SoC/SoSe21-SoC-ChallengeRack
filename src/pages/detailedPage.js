import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { updateChallenge as updateChallengeMutation } from '../graphql/mutations';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';

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
  textfield: {
    backgroundColor: '#EEEEEE',
    width: '98%',
  },
  label: {
    paddingTop: "10px",
  },
  title: {
    paddingTop: "40px",
  },
  button: {
    padding: "0px 10px 10px 0px",
    display: "inline-block",
  },
}));


const DetailedPage = ({ props, handleHide, challenge, fetchChallenges, deleteChallenge, setSelected }) => {
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
    publCheck: challenge.publCheck,
    chatitle: challenge.chatitle,
    theme: challenge.theme,
    technology: challenge.technology,
    repu: challenge.repu,
    feasibil: challenge.feasibil,
    impact: challenge.impact,
    scalabil: challenge.scalabil,
    aligment: challenge.aligment,
    prototype: challenge.prototype,
    score: challenge.score,
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
    publDate: challenge.publDate,
  }
  const classes = useStyles();

  const [formData, setFormData] = useState(initialFormState);
  const [pic, setPic] = useState(false);
  const updateChallenge = async (event) => {
    await API.graphql({ query: updateChallengeMutation, variables: { input: formData } });
  }
  return (
    <form noValidate autoComplete="off">
      <div className={classes.button}>
        <Button onClick={() => { fetchChallenges(); handleHide(); setSelected(""); }} variant="contained" color="primary">
          {!props.language ? "Zurück zur Übersicht" : "Back to the overview"}
        </Button>
        </div>
        <div className={classes.button}>
        <Button onClick={() => { updateChallenge(); fetchChallenges(); }} variant="contained" color="primary">
          {!props.language ? "Challenge-Daten übernehmen" : "Update challenge data"}
        </Button>
        </div>
        <div className={classes.button}>
        <Button onClick={() => { deleteChallenge(challenge); handleHide(); }} variant="contained" color="primary">
          {!props.language ? "Challenge löschen" : "Delete challenge"}
        </Button>
      </div>
      <div align="left">
        <img onError={(event) => event.target.src = 'https://amplify-rack-dev-145931-deployment.s3.amazonaws.com/noPicture.jpg'} height="100" src={"https://amplify-rack-dev-145931-deployment.s3.amazonaws.com/" + challenge.orgaTitle + ".jpg"} />
      </div>
      <div className={classes.root2}>
        <Typography className={classes.title} align="left" gutterBottom variant="h5">{!props.language ? "Allgemein" : "General"}</Typography>
        <Divider />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>ID</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'id': e.target.value })}
          value={formData.id}
          readOnly={true}
          multiline
          inputProps={{ 'aria-label': 'naked' }}
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>Phase</b></Typography>
        <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={e => setFormData({ ...formData, 'phase': e.target.value })}
            value={formData.phase}
          >
            <MenuItem value={"Identify"}>Identify</MenuItem>
            <MenuItem value={"Engage"}>Engage</MenuItem>
            <MenuItem value={"Define"}>Define</MenuItem>
            <MenuItem value={"Build "}>Build </MenuItem>
            <MenuItem value={"Realize Value"}>Realize Value</MenuItem>
          </Select>
        </FormControl>
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>Status</b></Typography>
        <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={e => setFormData({ ...formData, 'status': e.target.value })}
            value={formData.status}
          >
            <MenuItem value={"Exploring"}>Exploring</MenuItem>
            <MenuItem value={"Applied"}>Applied</MenuItem>
            <MenuItem value={"Qualified"}>Qualified</MenuItem>
            <MenuItem value={"Disqualified "}>Disqualified </MenuItem>
            <MenuItem value={"Matched"}>Matched</MenuItem>
            <MenuItem value={"Planned"}>Planned</MenuItem>
            <MenuItem value={"Executing"}>Executing</MenuItem>
            <MenuItem value={"Presented"}>Presented</MenuItem>
            <MenuItem value={"Published "}>Published </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.root}>
        <Typography className={classes.title} align="left" gutterBottom variant="h5">{!props.language ? "Kontakt" : "Contact"}</Typography>
        <Divider />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Kontakt Name" : "Contact Name"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'coName': e.target.value })}
          value={formData.coName}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Kontakt Titel" : "Contact Title"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'coTitle': e.target.value })}
          value={formData.coTitle}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Kontakt Email" : "Contact Email"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'coEmail': e.target.value })}
          value={formData.coEmail}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Kontakt Telefon" : "Contact Phone"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'coPhone': e.target.value })}
          value={formData.coPhone}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Einverständniserklärung Newsletter" : "Contact Opt-In"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'status': e.target.value })}
          value={formData.coOptIn}
          multiline
        />
      </div>
      <div className={classes.root}>
        <Typography className={classes.title} align="left" gutterBottom variant="h5">{!props.language ? "Organisation" : "Organization"}</Typography>
        <Divider />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Name der Organisation" : "Organazation's Name"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'orgaTitle': e.target.value })}
          value={formData.orgaTitle}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Standort der Organisation" : "Organazation's Location"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'orgaLocat': e.target.value })}
          value={formData.orgaLocat}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Auftrag der Organisation" : "Organazation's Mission"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'orgaMission': e.target.value })}
          value={formData.orgaMission}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Webseite der Organisation" : "Organazation's Website"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'orgaWebsite': e.target.value })}
          value={formData.orgaWebsite}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Erstellungsdatum der Challenge" : "Submission Date"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'orgaDate': e.target.value })}
          value={formData.orgaDate}
          multiline
        />
      </div>
      <div className={classes.root}>
        <Typography className={classes.title} align="left" gutterBottom variant="h5">Challenge</Typography>
        <Divider />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Statement der Challenge" : "Challenge Statement"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'chaStatem': e.target.value })}
          value={formData.chaStatem}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Beschreibung der Challenge" : "Challenge Description"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'chaDes': e.target.value })}
          value={formData.chaDes}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Stakeholder der Challenge" : "Challenge Stakeholders"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'chaStak': e.target.value })}
          value={formData.chaStak}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Hintergrund der Challenge" : "Challenge Background"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'chaBac': e.target.value })}
          value={formData.chaBac}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Unterstützung für Challenge" : "Challenge Support"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'chaSup': e.target.value })}
          value={formData.chaSup}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Unterstützung der Führungskräfte" : "Leadership Support"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'leadSup': e.target.value })}
          value={formData.leadSup}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Erfolgskriterien" : "Criteria of Success"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'critOfSuc': e.target.value })}
          value={formData.critOfSuc}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Nächste Schritte" : "Next Steps"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'nextStep': e.target.value })}
          value={formData.nextStep}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Einverständniserklärung für Veröffentlichung" : "Publish check"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'publCheck': e.target.value })}
          value={formData.publCheck}
          multiline
        />
      </div>
      <div className={classes.root}>
        <Typography className={classes.title} align="left" gutterBottom variant="h5">{!props.language ? "Rezension" : "Review"}</Typography>
        <Divider />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Name der Challenge:" : "Challenge's Title:"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'chatitle': e.target.value })}
          value={formData.chatitle}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Thema:" : "Theme:"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'theme': e.target.value })}
          value={formData.theme}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Technik:" : "Technology:"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'technology': e.target.value })}
          value={formData.technology}
          multiline
        />
      </div>
      <div className={classes.root}>
        <Typography className={classes.title} align="left" gutterBottom variant="h5">{!props.language ? "Bewertung" : "Scoring"}</Typography>
        <Divider />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Reputation:" : "Reputation:"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'repu': e.target.value })}
          value={formData.repu}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Realisierbarkeit:" : "Feasibility:"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'feasibil': e.target.value })}
          value={formData.feasibil}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Auswirkungen:" : "Impact:"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'impact': e.target.value })}
          value={formData.impact}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Skalierbarkeit:" : "Scalability:"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'scalabil': e.target.value })}
          value={formData.scalabil}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Ausrichtung:" : "Alignment:"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'aligment': e.target.value })}
          value={formData.aligment}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Prototyp:" : "Prototype:"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'prototype': e.target.value })}
          value={formData.prototype}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Punktestand:" : "Score:"}</b></Typography>
      </div>
      <TextField
        id="outlined-number"
        type="number"
        onChange={e => setFormData({ ...formData, 'score': e.target.value })}
        value={formData.score}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <div className={classes.root}>
        <Typography className={classes.title} align="left" gutterBottom variant="h5">{!props.language ? "Typ" : "Type"}</Typography>
        <Divider />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Challenge Typ:" : "Challenge Type:"}</b></Typography>
        <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={e => setFormData({ ...formData, 'type': e.target.value })}
            value={formData.type}
          >
            <MenuItem value={"Student projects"}>Student projects</MenuItem>
            <MenuItem value={"Student challenges"}>Student challenges</MenuItem>
            <MenuItem value={"Startup challenges"}>Startup challenges</MenuItem>
          </Select>
        </FormControl>
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Kommentar:" : "Comment:"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'comment': e.target.value })}
          value={formData.comment}
          multiline
        />
      </div>
      <div className={classes.root}>
        <Typography className={classes.title} align="left" gutterBottom variant="h5">{!props.language ? "Zuordnung" : "Matching"}</Typography>
        <Divider />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Fakultät:" : "Faculty:"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'faculty': e.target.value })}
          value={formData.faculty}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>Professor</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'prof': e.target.value })}
          value={formData.prof}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>Email</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'matchEmail': e.target.value })}
          value={formData.matchEmail}
          multiline
        />
      </div>
      <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Anzahl der Teams:" : "Number of Teams:"}</b></Typography>
      <TextField
        id="outlined-number"
        type="number"
        onChange={e => setFormData({ ...formData, 'numberOfT': e.target.value })}
        value={formData.numberOfT}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Anzahl der Studenten:" : "Number of Students:"}</b></Typography>
      <TextField
        id="outlined-number"
        type="number"
        onChange={e => setFormData({ ...formData, 'numberOfS': e.target.value })}
        value={formData.numberOfS}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <Typography className={classes.title} align="left" gutterBottom variant="h5">Plan</Typography>
      <Divider />
      <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Start-Datum:" : "Start Date:"}</b></Typography>
      <TextField
        id="date"
        type="date"
        onChange={e => setFormData({ ...formData, 'startDate': e.target.value })}
        value={formData.startDate}
        InputLabelProps={{
          shrink: true,
        }}
      />


      <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "End-Datum:" : "End Date:"}</b></Typography>
      <TextField
        id="date"
        type="date"
        onChange={e => setFormData({ ...formData, 'endDate': e.target.value })}
        value={formData.endDate}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <div className={classes.root}>
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Semester:" : "Cohort:"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'cohort': e.target.value })}
          value={formData.cohort}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Meilensteine:" : "Milestones:"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'milestone': e.target.value })}
          value={formData.milestone}
          multiline
        />
      </div>
      <div className={classes.root}>
        <Typography className={classes.title} align="left" gutterBottom variant="h5">{!props.language ? "Ergebnis:" : "Result:"}</Typography>
        <Divider />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "URL für Veröffentlichung:" : "Publication URL:"}</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'publURL': e.target.value })}
          value={formData.publURL}
          multiline
        />
        <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>GitHub URL</b></Typography>
        <InputBase
          className={classes.textfield}
          onChange={e => setFormData({ ...formData, 'gitHubURL': e.target.value })}
          value={formData.gitHubURL}
          multiline
        />
      </div>
      <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Veröffentlichkeitsdatum:" : "Publication Date:"}</b></Typography>
      <TextField
        id="date"
        type="date"
        onChange={e => setFormData({ ...formData, 'publDate': e.target.value })}
        value={formData.publDate}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
};


export default DetailedPage;
