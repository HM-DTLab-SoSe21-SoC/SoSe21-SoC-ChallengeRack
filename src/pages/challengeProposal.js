import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listChallenges } from '../graphql/queries';
import { NavLink } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { createChallenge as createChallengeMutation } from '../graphql/mutations';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

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
    padding: "30px",
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
  coOptIn: "no",
  chaStatem: "",
  chaDes: "",
  chaStak: "",
  chaBac: "",
  chaSup: "",
  leadSup: "",
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

export default function ChallengeProposal(props) {
  const classes = useStyles();
  const [challenges, setChallenges] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [apiError, setApiError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [hide, setHide] = useState(false);
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
    if (!formData.orgaLocat || !formData.orgaTitle || !formData.publCheck
      /*
      !formData.coName || !formData.orgaWebsite || !formData.coEmail ||
      !formData.critOfSuc || !formData.chaStatem || !formData.coTitle ||
      !formData.orgaMission || !formData.chaStak || !formData.chaBak  ||
      !formData.chaSup || !formData.leadSup || !formData.nextStep
      */
    ) {
      alert("Please fill in all the mandatory fields.");
      return;
    }
    else {
      setHide(true);
    }
    await API.graphql({ query: createChallengeMutation, variables: { input: formData } });
    setChallenges([...challenges, formData]);
    setFormData(initialFormState);
  }
  const handleCheck = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      setFormData({ ...formData, 'coOptIn': "yes" })
    }
    else {
      setFormData({ ...formData, 'coOptIn': "no" })
    }

  };
  const handleCheck2 = (event) => {
    setChecked2(event.target.checked);
    if (event.target.checked) {
      setFormData({ ...formData, 'publCheck': "yes" })
    }
    else {
      setFormData({ ...formData, 'publCheck': "no" })
    }

  };
  return (
    <Paper className={classes.paper}>

      <form align="left" className={classes.form} noValidate autoComplete="off">
        <h3 align="center">
          {!props.language ? "Vorschlagsformular" : "Challenge proposal form"}
        </h3>
        <p className={classes.root}>
          {!props.language ? "Dieses Dokument soll Ihnen und uns helfen, die Herausforderung in Hinblick auf digitale Transformation, vor denen Ihre Organisation steht, klarer zu definieren. So können wir besser einschätzen, worum es Ihnen bzw. Ihren Anspruchsgruppen (Mitglieder, KundInnen, PatientInnen, etc.) geht, und ob und wo wir mit digitalen Lösungsansätzen helfen können. Außerdem wollen wir – soweit zum jetzigen Zeitpunkt möglich – einen Eindruck gewinnen, wie Ihre Mitwirkung bei der Erarbeitung möglicher Challenge-Lösungen im Digital Transformation Lab aussehen kann." : "This form is intended to help you and us to more clearly define the digital transformation challenge your organization faces. This will enable us to better assess what is important to you or your stakeholders (members, customers, patients, etc.), and whether and where we can help with digital solutions. We also want to get an idea, as far as possible at this stage, of what your involvement in the development of possible challenge solutions in the Digital Transformation Lab might look like."}
        </p>
        <div className={classes.root}>
          <div>
            <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label={!props.language ? "Name der Organisation" : "Organazation's Name"}
              onChange={e => setFormData({ ...formData, 'orgaTitle': e.target.value })}
              value={formData.orgaTitle}
            />
          </div>
          <div>
            <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label={!props.language ? "Standort der Organisation" : "Organazation's Location"}
              onChange={e => setFormData({ ...formData, 'orgaLocat': e.target.value })}
              value={formData.orgaLocat}
            />
          </div>
          <div>
            <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label={!props.language ? "Autor" : "Author"}
              onChange={e => setFormData({ ...formData, 'coName': e.target.value })}
              value={formData.coName}
            />
          </div>
          <div>
            <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label={!props.language ? "Webseite der Organisation" : "Organazation's Website"}
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
            <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-required" label={!props.language ? "Telefon" : "Phone (optional)"}
              onChange={e => setFormData({ ...formData, 'coPhone': e.target.value })}
              value={formData.coPhone}
            />
          </div>
        </div>
        <div className={classes.root2}>
          <div>
            <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-multiline-static" label={!props.language ? "Erzählen Sie uns ein wenig über Ihre Organisation. Was ist ihre Mission?" : "Tell us a bit about your organization. What is its key mission (challenge statement)?"}
              onChange={e => setFormData({ ...formData, 'chaStatem': e.target.value })}
              value={formData.chaStatem}
              variant="outlined"
              multiline
              rows={4}
            />
          </div>
          <div>
            <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-multiline-static" label={!props.language ? "Wer sind Sie und was ist Ihre Rolle innerhalb Ihrer Organisation?" : "Who are you and what is your role within the organization?"}
              onChange={e => setFormData({ ...formData, 'coTitle': e.target.value })}
              value={formData.coTitle}
              variant="outlined"
              multiline
              rows={2}
            />
          </div>
          <div>
            <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-multiline-static" label={!props.language ? "Erzählen Sie uns jetzt von Ihrer Challenge! Welches Problem oder welche Gelegenheit möchten Sie angehen?" : "Now, tell us about your challenge. What problem or opportunity would you like to address?"}
              onChange={e => setFormData({ ...formData, 'orgaMission': e.target.value })}
              value={formData.orgaMission}
              variant="outlined"
              multiline
              rows={6}
            />
          </div>
          <div>
            <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-multiline-static" label={!props.language ? "Wer sind Ihre Anspruchsgruppen – sowohl mittelbar (z.B. Lehrpersonal, MitarbeiterInnen, Ehrenamtliche) als auch Endnutzer (z.B. Studierende, KundInnen, PatientInnen, Mitglieder)" : "Who are your customers/stakeholders-both intermediary (e.g. employees, faculty, volunteers) and end users (e.g. students, patients):"}
              onChange={e => setFormData({ ...formData, 'chaStak': e.target.value })}
              value={formData.chaStak}
              variant="outlined"
              multiline
              rows={4}
            />
          </div>
          <div>
            <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-multiline-static" label={!props.language ? "Versuchen Sie bereits heute, dieses Problem zu lösen? Wie?" : "Do you already try to solve this problem today? How?"}
              onChange={e => setFormData({ ...formData, 'chaBak': e.target.value })}
              value={formData.chaBak}
              variant="outlined"
              multiline
              rows={4}
            />
          </div>
          <div>
            <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-multiline-static" label={!props.language ? "Ohne Ihre Hilfe können wir das Problem nicht lösen. Sind Sie bereit und in der Lage, uns zu unterstützen (Mitarbeit, Testdaten, usw.)? Wie? " : "We cannot solve the problem without your help. Would you be willing and able to support (staff, data, etc.)? How?"}
              onChange={e => setFormData({ ...formData, 'chaSup': e.target.value })}
              value={formData.chaSup}
              variant="outlined"
              multiline
              rows={2}
            />
          </div>
          <div>
            <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-multiline-static" label={!props.language ? "Stellen wir uns vor, wir haben ein Semester lang an Ihrer Challenge gearbeitet. Wie würden Sie den Erfolg danach messen?" : "Let's imagine - we have been working on your challenge for a semester/term. How would you measure the success afterwards?"}
              onChange={e => setFormData({ ...formData, 'critOfSuc': e.target.value })}
              value={formData.critOfSuc}
              variant="outlined"
              multiline
              rows={2}
            />
          </div>
          <div>
            <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-multiline-static" label={!props.language ? "Es ist uns wichtig, tatsächliche Ergebnisse mit unseren Challenges zu erzielen. Haben Sie für diese Challenge Unterstützung auf der Führungsebene? Wer ist das?" : "It is important to us to drive actual impact. Do you have executive and leadership support for this challenge? Who is this?"}
              onChange={e => setFormData({ ...formData, 'leadSup': e.target.value })}
              value={formData.leadSup}
              variant="outlined"
              multiline
              rows={2}
            />
          </div>
          <div>
            <TextField InputLabelProps={{ shrink: true, }} align="left" id="standard-multiline-static" label={!props.language ? "Was sind aus Ihrer Sicht die nächsten Schritte, um eine vielversprechende Idee in der Realität / in Ihrer Organisation umzusetzen?" : "In your opinion, what are the next steps to implement a promising idea in reality/in your organization?"}
              onChange={e => setFormData({ ...formData, 'nextStep': e.target.value })}
              value={formData.nextStep}
              variant="outlined"
              multiline
              rows={2}
            />
          </div>
          <div>
            <Checkbox
              color="primary"
              checked={checked2}
              onChange={handleCheck2}
            />
            {!props.language ? "Als öffentliche Einrichtung veröffentlichen wir die Ergebnisse einer Challenge unter einer OpenSource-Lizenz, um weitere Innovationen anzuregen. Ist das für Sie in Ordnung?" : "As a public institution, we publish the results of a challenge under an open source license to stimulate further innovation. Is that okay with you?"}
          </div>
          <div>
            <Checkbox
              color="primary"
              checked={checked}
              onChange={handleCheck}
            />
            {!props.language ? "Möchten Sie sich für weitere Benachrichtigungen, z. B. den DTLab-Newsletter, anmelden (optional)?" : "Would you like to opt-in for further communication, eg. the DTLab newsletter?(optional)"}
          </div>
        </div>
        <div align="left">
          <p>
            {!props.language ? "Das DTLab ist Teil des Innovationsnetzwerks" : "The DTLab is part of the innovation network"}
            <a href="https://hm.edu/munivercity/"> M:UniverCity </a>
            {!props.language ? "an der Hochschule München, das CoCreation-Projekte mit Partnern aus Wissenschaft, Wirtschaft, Zivilgesellschaft und Politik organisiert. Durch die Teilnahme an einer Challenge wird Ihre Organisation gleichzeitig Mitglied bei M:UniverCity. Aus der Mitgliedschaft entstehen keinerlei Verpflichtungen." : "at Munich University of Applied Sciences, which organizes CoCreation projects with partners from science, business, civil society and politics. By participating in a Challenge, your organization becomes a member of M:UniverCity at the same time. No obligations arise from the membership."}
          </p>
        </div>
        {!hide && <Box>
          <div>
            <Button onClick={() => { createChallenge(); fetchChallenges(); }} variant="contained" color="primary">
              Create Challenge
            </Button>
          </div>
        </Box>}
        {hide && <Box>
          <Divider />
          <p>
            Congratulations you created a challenge!
          </p>
          <NavLink to='/admin/challengeView'>
            <Button onClick={() => { fetchChallenges(); }} color="primary">
              Switch to overview
            </Button>
          </NavLink>
        </Box>}

      </form>
    </Paper>
  );
}
