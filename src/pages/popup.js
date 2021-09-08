import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { updateChallenge as updateChallengeMutation } from '../graphql/mutations';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import {
  Box,
  Container,
  Grid,
  Button,
  Icon,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      autoWidth: true,
    },
  },
  root2: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      autoWidth: true,
    },
  },
  details: {
    padding: "15px",
  },
  background: {
    position: "absolute",
    zIndex: "1",
    height: "100%",
    width: "100%",
    display: "block",
    top: "0",
    left: "0",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    "&:after": {
      position: "absolute",
      zIndex: "3",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      opacity: ".8",
    },
  },
}));


const Popup = ({ props, handleClose, challenge, fetchChallenges, }) => {
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
    createdAt: challenge.createdAt,
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
        <Grid item md={5}>
          <IconButton
            button
            onClick={handleClose}>
            <Icon >
              <ChevronLeftIcon />
            </Icon>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </IconButton>
          <div />
          <img align="left" height="60" src={"https://w3-mediapool.hm.edu/mediapool/media/baukasten/img_2/dtlab_1/bilder_138/_dtl_bilder_neu/corona-5401250_1280_Standard_Standard.jpg"} />
          <p>&nbsp;</p>
          <div className={classes.root2}>
            <h3>
              {!props.language ? "Organisation" : "Organization"}
            </h3>
            <TextField align="left" id="standard-required" label={!props.language ? "Name der Organisation" : "Organazation's Title"}
              onChange={e => setFormData({ ...formData, 'orgaTitle': e.target.value })}
              value={formData.orgaTitle}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField align="left" id="standard-required" label={!props.language ? "Standort der Organisation" : "Organazation's Location"}
              onChange={e => setFormData({ ...formData, 'orgaLocat': e.target.value })}
              value={formData.orgaLocat}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField align="left" id="standard-required" label={!props.language ? "Erstellungsdatum" : "Submission Date"}
              onChange={e => setFormData({ ...formData, 'createdAt': e.target.value })}
              value={formData.createdAt}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className={classes.root}>
            <h3>Challenge</h3>
            <TextField align="left" id="standard-required" label={!props.language ? "Stellungnahme" : "Challenge's Statement"}
              onChange={e => setFormData({ ...formData, 'chaStatem': e.target.value })}
              value={formData.chaStatem}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField align="left" id="standard-required" label={!props.language ? "Beschreibung der Challenge" : "Challenge's Description"}
              onChange={e => setFormData({ ...formData, 'chaDes': e.target.value })}
              value={formData.chaDes}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField align="left" id="standard-required" label={!props.language ? "Stakeholder der Challenge" : "Challenge's Stakeholders"}
              onChange={e => setFormData({ ...formData, 'chaStak': e.target.value })}
              value={formData.chaStak}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField align="left" id="standard-required" label={!props.language ? "Hintergrund der Challenge" : "Challenge's Background"}
              onChange={e => setFormData({ ...formData, 'chaBac': e.target.value })}
              value={formData.chaBac}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField align="left" id="standard-required" label={!props.language ? "Unterstützung" : "Challenge's Support"}
              onChange={e => setFormData({ ...formData, 'chaSup': e.target.value })}
              value={formData.chaSup}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField align="left" id="standard-required" label={!props.language ? "Unterstützung der Führung" : "Leadership Support"}
              onChange={e => setFormData({ ...formData, 'leadSup': e.target.value })}
              value={formData.leadSup}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField align="left" id="standard-required" label={!props.language ? "Erfolgskriterien" : "Criteria of Success"}
              onChange={e => setFormData({ ...formData, 'critOfSuc': e.target.value })}
              value={formData.critOfSuc}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField align="left" id="standard-required" label={!props.language ? "Nächste Schritte" : "Next Steps"}
              onChange={e => setFormData({ ...formData, 'nextStep': e.target.value })}
              value={formData.nextStep}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className={classes.root}>
            <h3>
              {!props.language ? "Bewertung" : "Review"}
            </h3>
            <TextField align="left" id="standard-required" label={!props.language ? "Name der Challenge" : "Challenge's Title"}
            onChange={e => setFormData({ ...formData, 'chatitle': e.target.value })}
            value={formData.chatitle}
            InputProps={{
              readOnly: true,
            }}
            />
            <TextField align="left" id="standard-required" label={!props.language ? "Thema" : "Theme"}
            onChange={e => setFormData({ ...formData, 'theme': e.target.value })}
            value={formData.theme}
            InputProps={{
              readOnly: true,
            }}
            />
            <TextField align="left" id="standard-required" label={!props.language ? "Technik" : "Technology"}
            onChange={e => setFormData({ ...formData, 'chaDes': e.target.value })}
            value={formData.technology}
            InputProps={{
              readOnly: true,
            }}
            />
          </div>
        </Grid>
      </div>
      <div
      />



    </form>
  );
};


export default Popup;
