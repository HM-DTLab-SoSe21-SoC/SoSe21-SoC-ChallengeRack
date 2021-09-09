import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { updateChallenge as updateChallengeMutation } from '../graphql/mutations';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Icon } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      autoWidth: true,
      maxWidth:'50px'
    },
  },
  root2: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      autoWidth: true,
      maxWidth:"50px"
    },
  },
  textfield: {
    paddingBottom: "10px",
    autoWidth: true,
    width: "500px",
  },
  paper: {
    padding: "30px",
    width: "1000px",
  }
}));

const Popup = ({ props, handleClose, challenge }) => {
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
  return (
    <div className={classes.paper}>
      <form noValidate autoComplete="off">
        <div >
          <IconButton
            button
            onClick={handleClose}>
            <Icon >
              <ChevronLeftIcon />
            </Icon>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </IconButton>
        </div>
        <div align="left">
          <img height="60" src={"https://w3-mediapool.hm.edu/mediapool/media/baukasten/img_2/dtlab_1/bilder_138/_dtl_bilder_neu/corona-5401250_1280_Standard_Standard.jpg"} />
        </div>
        <div className={classes.root}>
          <Typography align="left" gutterBottom variant="h5">{!props.language ? "Organisation" : "Organization"}</Typography>
          <Divider />
          <Typography align="left" gutterBottom variant="body2"><b>{!props.language ? "Name der Organisation:" : "Organazation's Title:"}</b></Typography>
          <Typography align="left" gutterBottom variant="body2">{challenge.orgaTitle}</Typography>

          <Typography align="left" gutterBottom variant="body2"><b>{!props.language ? "Standort der Organisation:" : "Organazation's Location:"}</b></Typography>
          <Typography align="left" gutterBottom variant="body2">{challenge.orgaLocat}</Typography>

          <Typography align="left" gutterBottom variant="body2"><b>{!props.language ? "Erstellungsdatum:" : "Submission Date:"}</b></Typography>
          <Typography align="left" gutterBottom variant="body2">{challenge.createdAt}</Typography>

        </div>
        <div className={classes.root2}>
          <Typography align="left" gutterBottom variant="h5">{!props.language ? "Challenge" : "Challenge"}</Typography>
          <Divider />
          <Typography align="left" gutterBottom variant="body2"><b>{!props.language ? "Stellungnahme:" : "Challenge's Statement:"}</b></Typography>
          <Container maxWidth="50px">
            <Typography  maxWidth="50px"  align="left" gutterBottom variant="body2">{challenge.chaStatem}</Typography>
          </Container>
          <Typography align="left" gutterBottom variant="body2"><b>{!props.language ? "Beschreibung der Challenge:" : "Challenge's Description:"}</b></Typography>
          <Typography align="left" gutterBottom variant="body2">{challenge.chaDes}</Typography>

          <Typography align="left" gutterBottom variant="body2"><b>{!props.language ? "Stakeholder der Challenge:" : "Challenge's Stakeholders:"}</b></Typography>
          <Typography align="left" gutterBottom variant="body2">{challenge.chaStak}</Typography>

          <Typography align="left" gutterBottom variant="body2"><b>{!props.language ? "Hintergrund der Challenge:" : "Challenge's Background:"}</b></Typography>
          <Typography align="left" gutterBottom variant="body2">{challenge.chaBac}</Typography>

          <Typography align="left" gutterBottom variant="body2"><b>{!props.language ? "Unterstützung:" : "Challenge's Support:"}</b></Typography>
          <Typography align="left" gutterBottom variant="body2">{challenge.chaSup}</Typography>

          <Typography align="left" gutterBottom variant="body2"><b>{!props.language ? "Unterstützung der Führung:" : "Leadership Support:"}</b></Typography>
          <Typography align="left" gutterBottom variant="body2">{challenge.leadSup}</Typography>

          <Typography align="left" gutterBottom variant="body2"><b>{!props.language ? "Erfolgskriterien:" : "Criteria of Success:"}</b></Typography>
          <Typography align="left" gutterBottom variant="body2">{challenge.critOfSuc}</Typography>

          <Typography align="left" gutterBottom variant="body2"><b>{!props.language ? "Nächste Schritte:" : "Next Steps:"}</b></Typography>
          <Typography align="left" gutterBottom variant="body2">{challenge.nextStep}</Typography>

        </div>
        <div className={classes.root2}>
          <Typography align="left" gutterBottom variant="h5">{!props.language ? "Bewertung" : "Review"}</Typography>
          <Divider />
          <Typography align="left" gutterBottom variant="body2"><b>{!props.language ? "Name der Challenge:" : "Challenge's Title:"}</b></Typography>
          <Typography align="left" gutterBottom variant="body2">{challenge.chatitle}</Typography>

          <Typography align="left" gutterBottom variant="body2"><b>{!props.language ? "Thema:" : "Theme:"}</b></Typography>
          <Typography align="left" gutterBottom variant="body2">{challenge.theme}</Typography>

          <Typography align="left" gutterBottom variant="body2"><b>{!props.language ? "Technik:" : "Technology:"}</b></Typography>
          <Typography align="left" gutterBottom variant="body2">{challenge.technology}</Typography>

        </div>
      </form >
    </div>
  );
};

export default Popup;
