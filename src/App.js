import React, { useState, useEffect } from 'react';
import './App.css'

import Amplify from '@aws-amplify/core';
import awsmobile from './aws-exports';
import { API } from 'aws-amplify';
import { listChallanges } from './graphql/queries';

import { withAuthenticator } from 'aws-amplify-react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

Amplify.configure(awsmobile);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listChallanges });
    setNotes(apiData.data.listChallanges.items);
  }
  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Phase</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Orga Title</TableCell>
              <TableCell align="left">Orga City</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Score</TableCell>
              <TableCell align="left">Theme</TableCell>
              <TableCell align="left">Technology</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((notes) => (
              <TableRow key={notes.id}>
                <TableCell component="th" scope="note">
                  {notes.id}
                </TableCell>
                <TableCell align="left">{notes.phase}</TableCell>
                <TableCell align="left">{notes.status}</TableCell>
                <TableCell align="left">{notes.orgaTitle}</TableCell>
                <TableCell align="left">{notes.orgaCity}</TableCell>
                <TableCell align="left">{notes.title}</TableCell>
                <TableCell align="left">{notes.type}</TableCell>
                <TableCell align="left">{notes.score}</TableCell>
                <TableCell align="left">{notes.theme}</TableCell>
                <TableCell align="left">{notes.technology}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
/*
class App extends Component {
  state = { challanges: [] }
  async componentDidMount() {
    const data = await API.graphql(graphqlOperation(listChallanges))
    this.setState({
      challanges: data.data.listChallanges.items
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.challanges.map((challange, index) => (<p key={index}>
          {challange.content}   {challange.id}
          </p>))}
      </div >
    );
  }
}
*/
export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
});