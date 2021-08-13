import React, { useState, useEffect } from 'react';
import Amplify from '@aws-amplify/core';
import awsmobile from '../aws-exports';
import { API, graphqlOperation } from 'aws-amplify';
import { listChallenges } from '../graphql/queries';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { deleteChallenge, updateChallenge } from '../graphql/mutations';
import DetailedPage from './detailedPage'
import Box from '@material-ui/core/Box';
import { Button, Avatar } from '@material-ui/core';
import { withAuthenticator, Authenticator } from 'aws-amplify-react';
import CustomSignIn from "./signIn";

Amplify.configure(awsmobile);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ChallengeOverview = ({ }) => {
  const classes = useStyles();
  const [challenges, setChallenges] = useState([]);
  const [apiError, setApiError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [chall, setChall] = useState();
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
  async function deleteChallengeFunction(id) {
    try {
      await API.graphql(graphqlOperation(deleteChallenge, { input: { id } }));
      setChallenges(challenges.filter((challenge) => challenge.id !== id));
      setApiError(null);
    } catch (error) {
      console.error('Failed deleting challenge:', error);
      setApiError(error);
    }
  }
  async function updateChallengeFunction(challenge) {
    await API.graphql(
      graphqlOperation(updateChallenge, {
        input: {
          orgaTitle: challenge.orgaTitle,
          orgaLocat: challenge.orgaLocat,
          id: challenge.id,
        },
      })
    );
    setApiError(null);
  }
  if (isLoading) {
    return 'Loading...';
  }
  return (
    <div className="App">
      <Authenticator amplifyConfig={awsmobile}>
      </Authenticator>
      {show && <Box>
        <div align="left">
          {challenges.filter(challenge => challenge.id == chall).map(filteredChallenge => (
            <div align="left">
              <Button onClick={() => setShow(prev => !prev)} variant="contained" color="primary">
                Back to the overview
              </Button>
              <DetailedPage
                challenge={filteredChallenge}
                deleteChallengeFunction={deleteChallengeFunction}
                updateChallengeFunction={updateChallengeFunction}
              />
            </div>
          ))}
        </div>
      </Box>}
      {!show && <Box>
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
              {challenges.map((challenge, index) => (
                <TableRow key={challenge.id}>
                  <TableCell align="left"><Avatar alt={challenge.id} src='/' /></TableCell>
                  <TableCell component="th" scope="note">{challenge.id}</TableCell>
                  <TableCell align="left">{challenge.phase}</TableCell>
                  <TableCell align="left">{challenge.status}</TableCell>
                  <TableCell align="left">{challenge.orgaTitle}</TableCell>
                  <TableCell align="left">{challenge.orgaLocat}</TableCell>
                  <TableCell align="left">{challenge.chatitle}</TableCell>
                  <TableCell align="left">{challenge.type}</TableCell>
                  <TableCell align="left">{challenge.score}</TableCell>
                  <TableCell align="left">{challenge.theme}</TableCell>
                  <TableCell align="left">{challenge.technology}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => { setChall(challenge.id); setShow(prev => !prev); }} variant="contained" color="primary">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>}
    </div>
  );
}

export default withAuthenticator(ChallengeOverview, {
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
});
