import React, { useState, useEffect } from 'react';

import { API } from 'aws-amplify';
import { listChallanges } from '../graphql/queries';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
 
export default function DataGridDemo() {
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