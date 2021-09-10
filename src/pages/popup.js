import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Icon } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      autoWidth: true,
      maxWidth: '50px'
    },
  },
  root2: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      autoWidth: true,
      maxWidth: "50px"
    },
  },
  textfield: {
    backgroundColor: '#EEEEEE',
    width: '90%',

  },
  paper: {
    padding: "30px",
    width: "1000px",
  },
  label: {
    paddingTop: "10px",
  },
  title:{
    paddingTop: "40px",
  },
}));

const Popup = ({ props, handleClose, challenge }) => {
  const classes = useStyles();
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
          <img height="60" src={"https://us.123rf.com/450wm/koblizeek/koblizeek1902/koblizeek190200055/125337077-kein-bildvektorsymbol-verf%C3%BCgbares-symbol-fehlt-keine-galerie-f%C3%BCr-diesen-moment-.jpg?ver=6"} />
        </div>
        <div className={classes.root}>
          <Typography className={classes.title} align="left" gutterBottom variant="h5">{!props.language ? "Organisation" : "Organization"}</Typography>
          <Divider />
          <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Name der Organisation:" : "Organazation's Title:"}</b></Typography>
          <InputBase
            className={classes.textfield}
            defaultValue="-"
            value={challenge.orgaTitle}
            multiline
            inputProps={{ 'aria-label': 'naked' }}
          />
          <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Standort der Organisation:" : "Organazation's Location:"}</b></Typography>
          <InputBase
            className={classes.textfield}
            defaultValue="-"
            value={challenge.orgaLocat}
            multiline
            inputProps={{ 'aria-label': 'naked' }}
          />
          <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Erstellungsdatum:" : "Submission Date:"}</b></Typography>
          <InputBase
            className={classes.textfield}
            defaultValue="-"
            value={challenge.orgaDate}
            multiline
            inputProps={{ 'aria-label': 'naked' }}
          />
        </div>
        <div className={classes.root2}>
          <Typography className={classes.title} align="left" gutterBottom variant="h5">{!props.language ? "Challenge" : "Challenge"}</Typography>
          <Divider />
          <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Stellungnahme:" : "Challenge's Statement:"}</b></Typography>
          <InputBase
            className={classes.textfield}
            defaultValue="-"
            value={challenge.chaStatem}
            multiline
            inputProps={{ 'aria-label': 'naked' }}
          />
          <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Beschreibung der Challenge:" : "Challenge's Description:"}</b></Typography>
          <InputBase
            className={classes.textfield}
            defaultValue="-"
            value={challenge.chaDes}
            multiline
            inputProps={{ 'aria-label': 'naked' }}
          />
          <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Stakeholder der Challenge:" : "Challenge's Stakeholders:"}</b></Typography>
          <InputBase
            className={classes.textfield}
            defaultValue="-"
            value={challenge.chaStak}
            multiline
            inputProps={{ 'aria-label': 'naked' }}
          />
          <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Hintergrund der Challenge:" : "Challenge's Background:"}</b></Typography>
          <InputBase
            className={classes.textfield}
            defaultValue="-"
            value={challenge.chaBac}
            multiline
            inputProps={{ 'aria-label': 'naked' }}
          />
          <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Unterstützung für Challenge:" : "Challenge's Support:"}</b></Typography>
          <InputBase
            className={classes.textfield}
            defaultValue="-"
            value={challenge.chaSup}
            multiline
            inputProps={{ 'aria-label': 'naked' }}
          />
          <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Unterstützung der Führung:" : "Leadership Support:"}</b></Typography>
          <InputBase
            className={classes.textfield}
            defaultValue="-"
            value={challenge.leadSup}
            multiline
            inputProps={{ 'aria-label': 'naked' }}
          />
          <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Erfolgskriterien:" : "Criteria of Success:"}</b></Typography>
          <InputBase
            className={classes.textfield}
            defaultValue="-"
            value={challenge.critOfSuc}
            multiline
            inputProps={{ 'aria-label': 'naked' }}
          />
          <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Nächste Schritte:" : "Next Steps:"}</b></Typography>
          <InputBase
            className={classes.textfield}
            defaultValue="-"
            value={challenge.nextStep}
            multiline
            inputProps={{ 'aria-label': 'naked' }}
          />
        </div>
        <div className={classes.root2}>
          <Typography className={classes.title} align="left" gutterBottom variant="h5">{!props.language ? "Rezension" : "Review"}</Typography>
          <Divider />
          <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Name der Challenge:" : "Challenge's Title:"}</b></Typography>
          <InputBase
            className={classes.textfield}
            defaultValue="-"
            value={challenge.chatitle}
            multiline
            inputProps={{ 'aria-label': 'naked' }}
          />
          <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Thema:" : "Theme:"}</b></Typography>
          <InputBase
            className={classes.textfield}
            defaultValue="-"
            value={challenge.theme}
            multiline
            inputProps={{ 'aria-label': 'naked' }}
          />
          <Typography className={classes.label} align="left" gutterBottom variant="body2"><b>{!props.language ? "Technik:" : "Technology:"}</b></Typography>
          <InputBase
            className={classes.textfield}
            defaultValue="-"
            value={challenge.technology}
            multiline
            inputProps={{ 'aria-label': 'naked' }}
          />
        </div>
      </form >
    </div>
  );
};

export default Popup;
