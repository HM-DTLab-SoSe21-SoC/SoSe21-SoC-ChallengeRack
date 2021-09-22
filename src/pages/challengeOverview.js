import React, { useState, useEffect } from 'react';
import { deleteChallenge } from '../graphql/mutations';
import DetailedPage from './detailedPage'
import Box from '@material-ui/core/Box';
import { Button, Icon } from '@material-ui/core';

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
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import Search from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';

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
  { id: 'phase', numeric: false, disablePadding: true, label: 'Phase' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'orgaTitle', numeric: false, disablePadding: false, label: 'Orga. Name.' },
  { id: 'orgaLocat', numeric: false, disablePadding: false, label: 'Orga. Locat.' },
  { id: 'chatitle', numeric: false, disablePadding: false, label: 'Chall. Title' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'score', numeric: true, disablePadding: false, label: 'Score' },
  { id: 'theme', numeric: false, disablePadding: false, label: 'Theme' },
  { id: 'technology', numeric: false, disablePadding: false, label: 'Technology' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    padding: "30px",
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
  root2: {
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
  search: {
    "& > div": {
      marginTop: "0",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "10px 15px !important",
      float: "none !important",
      paddingTop: "1px",
      paddingBottom: "1px",
      padding: "0!important",
      width: "60%",
      marginTop: "40px",
      "& input": {
        color: "#FFF",
      },
    },
  },
  searchButton: {
    [theme.breakpoints.down("sm")]: {
      top: "-50px !important",
      marginRight: "22px",
      float: "right",
    },
  },
  searchIcon: {
    width: "17px",
    zIndex: "4",
  },
  searchWrapper: {
    [theme.breakpoints.down("sm")]: {
      width: "-webkit-fill-available",
      margin: "10px 15px 0",
    },
    paddingLeft: "15px",
    display: "inline-block",
    float: "left",

  },
}));
export default function ChallengeOverview({ props }) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [selectedChall, setSelectedChall] = useState([]);
  const [dense, setDense] = useState(false);
  const [search, setSearch] = useState([]);
  const [challSearch, setchallSearch] = useState(null);

  const [challenges, setChallenges] = useState([]);
  const [apiError, setApiError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect((event) => {
    fetchChallenges(event);
  }, []);

  const fetchChallenges = async (event) => {
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
  async function deleteChallengeFunction({ id }) {
    const newChallengesArray = challenges.filter(challenge => challenge.id !== id);
    setChallenges(newChallengesArray);
    await API.graphql({ query: deleteChallenge, variables: { input: { id } } });
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, challenge) => {
    if (selected == challenge.id) {
      setSelected('');
      setSelectedChall('')
    } else {
      setSelected(challenge.id);
    }
    setSelectedChall(challenge);
  };
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const handleHide = (event) => {
    setShow(prev => !prev);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value == "") {
      setchallSearch(null);
    } else {
      setchallSearch(event.target.value.toLowerCase());
    }
  };
  const handleNoPic = (ev) => {
    ev.target.src = 'https://us.123rf.com/450wm/koblizeek/koblizeek1902/koblizeek190200055/125337077-kein-bildvektorsymbol-verf%C3%BCgbares-symbol-fehlt-keine-galerie-f%C3%BCr-diesen-moment-.jpg?ver=6'
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {show && <Box>
          <div align="left" >
            {challenges.filter(challenge => challenge.id == selected).map(filteredChallenge => (
              <div align="left">
                <DetailedPage
                  props={props}
                  handleHide={handleHide}
                  challenge={filteredChallenge}
                  fetchChallenges={fetchChallenges}
                  deleteChallenge={deleteChallengeFunction}
                  setSelected={setSelected}
                />
              </div>
            ))}
          </div>
        </Box>}
        {!show && <Box>
          <Typography align="center" gutterBottom variant="h4">{!props.language ? "Übersicht der Challenges" : "Challenge Overview"}</Typography>
          <Toolbar
            className={clsx(classes.root2, {
              [classes.highlight]: selected.length > 0,
            })}
          >
            <TextField
              value={search}
              onChange={(event) => { handleSearch(event); }}
              placeholder={!props.language ? "Suche..." : "Search..."}
            />
            <Icon color="white" aria-label="edit" justIcon round>
              <Search />
            </Icon>
            {selected.length > 0 ? (
              <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                {challenges.filter(challenge => challenge.id == selected).map(filteredChallenge => (
                  <div>
                    {filteredChallenge.orgaTitle}
                    &nbsp;
                    {!props.language ? "ausgewählt" : "selected"}
                  </div>
                ))}
              </Typography>
            ) : (null)}
            {selected.length > 0 ? (
              <div align="right">
                <Tooltip title="Details">
                  <Button onClick={handleHide}>Details </Button>
                </Tooltip>
                <Tooltip title="Delete">
                  <Icon onClick={() => { deleteChallengeFunction(selectedChall) }} aria-label="delete">
                    <DeleteIcon />
                  </Icon>
                </Tooltip>
              </div>
            ) : (null)}
          </Toolbar>
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
                onRequestSort={handleRequestSort}
                rowCount={challenges.length}
              />
              <TableBody>
                {stableSort(challenges.filter(challenge => (challenge.search == challSearch || challenge.phase.toLowerCase().includes(challSearch) || challenge.status.toLowerCase().includes(challSearch) || challenge.orgaTitle.toLowerCase().includes(challSearch) || challenge.orgaLocat.toLowerCase().includes(challSearch) || challenge.chatitle.toLowerCase().includes(challSearch) || challenge.type.toLowerCase().includes(challSearch) || challenge.score.toLowerCase().includes(challSearch) || challenge.theme.toLowerCase().includes(challSearch) || challenge.technology.toLowerCase().includes(challSearch))), getComparator(order, orderBy))
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
                        <TableCell>
                          <img onError={(event) => event.target.src = 'https://amplify-rack-dev-145931-deployment.s3.amazonaws.com/noPicture.jpg'} height="50" src={"https://amplify-rack-dev-145931-deployment.s3.amazonaws.com/" + challenge.orgaTitle + ".jpg"} />
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
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>}
      </Paper>
      {!show && <Box>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>}
    </div>
  );
}