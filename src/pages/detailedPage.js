import React, { useState, useEffect, useReducer } from 'react';
import { Link } from "react-router-dom";
import { API } from 'aws-amplify';
import { listChallanges } from '../graphql/queries';
import { listPostsBySpecificID } from '../graphql/queries';
import { useParams } from 'react-router';
import { graphqlOperation } from '@aws-amplify/api';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { createChallange as createChallangeMutation, deleteChallange as deleteChallangeMutation } from '../graphql/mutations';
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
import moment from 'moment';
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
const INITIAL_QUERY = 'INITIAL_QUERY';
const ADDITIONAL_QUERY = 'ADDITIONAL_QUERY';
const initialFormState = { id: '', orgaTitle: '' }

const reducer = (state, action) => {
  switch (action.type) {
    case INITIAL_QUERY:
      return action.posts;
    case ADDITIONAL_QUERY:
      return [...state, ...action.posts]
    default:
      return state;
  }
};

export default function DataGridDemo() {
  const { userId } = useParams();
  const classes = useStyles();
  const [challanges, setChallanges] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  const [posts, dispatch] = useReducer(reducer, []);
  const [isLoading, setIsLoading] = useState(true);
  const [nextToken, setNextToken] = useState(null);

  const getPosts = async (type, nextToken = null) => {
    const res = await API.graphql(graphqlOperation(listPostsBySpecificID, {
      id: 1,
      sortDirection: 'DESC',
      limit: 20,
      nextToken: nextToken,
    }));
    console.log(res);
    dispatch({ type: type, posts: res.data.listPostsBySpecificID.items })
    setNextToken(res.data.listPostsBySpecificID.nextToken);
    setIsLoading(false);
  }
  const getAdditionalPosts = () => {
    if (nextToken === null) return; //Reached the last page
    getPosts(ADDITIONAL_QUERY, nextToken);
  }


  useEffect(() => {
    getPosts(INITIAL_QUERY);
  }, []);

  fetchChallanges(() => {
    fetchChallanges();
  }, []);

  async function fetchChallanges() {
    const apiData = await API.graphql({ query: listChallanges });
    setChallanges(apiData.data.listChallanges.items);
  }
  async function createChallange() {
    if (!formData.id || !formData.orgaCity || !formData.orgaTitle) return;
    await API.graphql({ query: createChallangeMutation, variables: { input: formData } });
    setChallanges([...challanges, formData]);
    setFormData(initialFormState);
  }

  async function deleteChallange({ id }) {
    const newChallengesArray = challanges.filter(challange => challange.id !== id);
    setChallanges(newChallengesArray);
    await API.graphql({ query: deleteChallangeMutation, variables: { input: { id } } });
  }
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField align="left" required id="standard-required" label="ID"
        onChange={e => setFormData({ ...formData, 'id': e.target.value })}
        value={formData.id}
      />
      <TextField align="left" id="standard-required" label="Organazation's Name"
        onChange={e => setFormData({ ...formData, 'orgaTitle': e.target.value })}
        value={formData.orgaTitle}
      />
      <TextField align="left" id="standard-required" label="Organazation's City"
        onChange={e => setFormData({ ...formData, 'orgaLocat': e.target.value })}
        value={formData.orgaLocat}
      />

      <div className={classes.listRoot}>
          <div className={classes.loader}>
            {challanges.map(challange => (
              <span>
                <PostItem challange={challange} />
                <Divider component="li" />
              </span>
            ))}
          </div>
          
      </div>
    </form>


  );
}
function PostItem({ challange }) {
  const classes = useStyles();
  const history = useHistory();
  const now = moment();
  console.log(now)

  const calcTimestampDiff = (timestamp) => {
    const scales = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];

    for (let i = 0; i < scales.length; i++) {
      const scale = scales[i];
      const diff = moment(now).diff(timestamp * 1000, scale);
      if (diff > 0) return diff + scale.charAt(0)
    }

    return 0 + scales[scales.length - 1].charAt(0)
  }

  return (
    <ListItem alignItems='flex-start' key={challange.id}>
      <ListItemAvatar>
        <div className={classes.clickable} onClick={() => history.push('/' + challange.id)}>
          <Avatar alt={challange.id} src='/' />
        </div>
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            {challange.id}
            <Typography
              color='textSecondary'
              display='inline'
            >
            </Typography>
          </React.Fragment>
        }
        secondary={
          <Typography
            color='textPrimary'
          >
            {challange.orgaLocat}
          </Typography>
        }
      />
    </ListItem>
  )
}