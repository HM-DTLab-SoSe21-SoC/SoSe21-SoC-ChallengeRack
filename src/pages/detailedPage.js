import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { API } from 'aws-amplify';
import { listChallanges } from '../graphql/queries';

import { makeStyles } from '@material-ui/core/styles';

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
      <p>Hallo</p>
      <Link to="/challangeOverview">
        <button variant="outlined">
        Challange overview
        </button>
      </Link>
    </div>
  );
}