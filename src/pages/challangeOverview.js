import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { listChallanges, getChallange } from '../graphql/queries';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { deleteChallange as deleteChallangeMutation } from '../graphql/mutations';
import {
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  CircularProgress,
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DataGridDemo() {
  const { id } = useParams()
  const classes = useStyles();
  const [challanges, setChallanges] = useState([]);

  fetchChallanges(() => {
    fetchChallanges();
  }, []);

  async function fetchChallanges() {
    const apiData = await API.graphql({ query: listChallanges });
    setChallanges(apiData.data.listChallanges.items);
  }
  async function deleteChallange({ id }) {
    const newChallengesArray = challanges.filter(challange => challange.id !== id);
    setChallanges(newChallengesArray);
    await API.graphql({ query: deleteChallangeMutation, variables: { input: { id } } });
  }
  async function spezChallange({ id }) {
    const oneTodo = await API.graphql(graphqlOperation(getChallange, { id: '1' }));
    setChallanges(oneTodo.data.listChallanges.items);
  }
  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left"> </TableCell>
              <TableCell align="left">ID</TableCell>
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
            {challanges.map((challange) => (
              <TableRow key={challange.id}>
                <TableCell align="left">
                  <Link to="/detailedPage">
                    <Avatar alt={challange.id} src='/' />
                  </Link>
                </TableCell>
                <TableCell component="th" scope="note">
                  {challange.id}
                </TableCell>
                <TableCell align="left">{challange.phase}</TableCell>
                <TableCell align="left">{challange.status}</TableCell>
                <TableCell align="left">{challange.orgaTitle}</TableCell>
                <TableCell align="left">{challange.orgaLocat}</TableCell>
                <TableCell align="left">{challange.chatitle}</TableCell>
                <TableCell align="left">{challange.type}</TableCell>
                <TableCell align="left">{challange.score}</TableCell>
                <TableCell align="left">{challange.theme}</TableCell>
                <TableCell align="left">{challange.technology}</TableCell>
                <button onClick={() => deleteChallange(challange)}>Delete challange</button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}