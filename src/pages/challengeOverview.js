import { deleteChallenge, updateChallenge } from '../graphql/mutations';
import DetailedPage from './detailedPage'
import Box from '@material-ui/core/Box';
import { Button, Avatar } from '@material-ui/core';
import { withAuthenticator, Authenticator } from 'aws-amplify-react';
import Amplify from '@aws-amplify/core';
import awsmobile from '../aws-exports';

import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listChallenges } from '../graphql/queries';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
Amplify.configure(awsmobile);

function createData(phase, status, orgaTitle, orgaLocat, chatitle, type, score, theme, technology) {
  return { phase, status, orgaTitle, orgaLocat, chatitle, type, score, theme, technology };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'phase', numeric: false, disablePadding: true, label: 'phase' },
  { id: 'status', numeric: false, disablePadding: false, label: 'status' },
  { id: 'orgaTitle', numeric: false, disablePadding: false, label: 'orgaTitle' },
  { id: 'orgaLocat', numeric: false, disablePadding: false, label: 'orgaLocat' },
  { id: 'chatitle', numeric: false, disablePadding: false, label: 'chatitle' },
  { id: 'type', numeric: false, disablePadding: false, label: 'type' },
  { id: 'score', numeric: true, disablePadding: false, label: 'score' },
  { id: 'theme', numeric: false, disablePadding: false, label: 'theme' },
  { id: 'technology', numeric: false, disablePadding: false, label: 'technology' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const [challenges, setChallenges] = useState([]);
  const [apiError, setApiError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const classes = useToolbarStyles();
  const { numSelected, challenge } = props;

  async function deleteChallengeFunction(id) {
    await API.graphql(graphqlOperation(deleteChallenge, { input: { id } }));
    setChallenges(challenges.filter((challenge) => challenge.id !== id));
  }
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Challenge overview
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => deleteChallengeFunction(challenge.id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

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

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [selectedChall, setSelectedChall] = useState([]);
  const [dense, setDense] = useState(false);

  const [challenges, setChallenges] = useState([]);
  const [apiError, setApiError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [chall, setChall] = useState();
  const [show, setShow] = useState(false);

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
    await API.graphql(graphqlOperation(deleteChallenge, { input: { id } }));
    setChallenges(challenges.filter((challenge) => challenge.id !== id));
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
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = challenges.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, challenge) => {
    const selectedIndex = selected.indexOf(challenge.id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, challenge.id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelectedChall(challenge);
    setSelected(newSelected);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleShow = (event) => {
    setShow(prev => !prev);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Authenticator amplifyConfig={awsmobile}>
        </Authenticator>
        {show && <Box>
          <div align="left">
            {challenges.filter(challenge => challenge.id == chall).map(filteredChallenge => (
              <div align="left">
                <Button onClick={(event) => handleShow(event)} variant="contained" color="primary">
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
        <EnhancedTableToolbar numSelected={selected.length} challenge={selectedChall} />
        {!show && <Box>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={challenges.length}
              />
              <TableBody>
                {stableSort(challenges, getComparator(order, orderBy))
                  .map((challenge, index) => {
                    const isItemSelected = isSelected(challenge.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, challenge)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={challenge.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="challenge" padding="none">
                          {challenge.phase}
                        </TableCell>
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
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>}
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}