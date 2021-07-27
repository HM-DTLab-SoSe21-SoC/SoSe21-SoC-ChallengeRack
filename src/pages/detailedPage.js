import { DataGrid } from '@material-ui/data-grid';
import React, { useState, useEffect, useReducer } from 'react';

import API, { graphqlOperation } from '@aws-amplify/api';

import { listPostsSortedByTimestamp } from '../graphql/queries';
import { onCreatePost } from '../graphql/subscriptions';

import PostList from '../components/PostList';

const SUBSCRIPTION = 'SUBSCRIPTION';
const INITIAL_QUERY = 'INITIAL_QUERY';
const ADDITIONAL_QUERY = 'ADDITIONAL_QUERY';
 
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataGridDemo() {
	  const getPosts = async (type, nextToken = null) => {
    const res = await API.graphql(graphqlOperation(listPostsSortedByTimestamp, {
      type: "challange",
      sortDirection: 'DESC',
      limit: 20, //default = 10
      nextToken: nextToken,
    }));
    console.log(res);
    dispatch({ type: type, posts: res.data.listPostsSortedByTimestamp.items })
    setNextToken(res.data.listPostsSortedByTimestamp.nextToken);
    setIsLoading(false);
  }
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        posts={posts}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}