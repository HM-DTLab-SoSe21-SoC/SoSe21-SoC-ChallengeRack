import React, { useState, useEffect } from 'react';
import Popup from './popup';
import { API, graphqlOperation } from 'aws-amplify';
import { listChallenges } from '../graphql/queries';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Search from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Popover from '@material-ui/core/Popover';
import {
  Box,
  Container,
  Grid,
  Icon,
} from '@material-ui/core';

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
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">

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
    paddingTop: "30px"
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
    paddingTop: "30px",
    paddingLeft: "30px",
    display: "inline-block",
    float: "left",

  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  popup: {
    maxWidth: 1000,
  },
}));
export default function ChallengeGallery({ props }) {
  const classes = useStyles();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [search, setSearch] = useState([]);
  const [challSearch, setchallSearch] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [apiError, setApiError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [chall, setChall] = useState();

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
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
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value == "") {
      setchallSearch(null);
    } else {
      setchallSearch(event.target.value.toLowerCase());
    }
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <Typography align="center" gutterBottom variant="h4">{!props.language ? "Übersicht der Challenges" : "Challenge Overview"}</Typography>
        <div className={classes.searchWrapper}>
          <TextField
            value={search}
            onChange={(event) => { handleSearch(event); }}
            placeholder={!props.language ? "Suche..." : "Search..."}
          />
          <Icon color="white" aria-label="edit" justIcon round>
            <Search />
          </Icon>
        </div>
        <div>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3
            }}
          >
            <Container maxWidth={false}>
              <Box sx={{ pt: 3 }}>
                <Grid
                  container
                  spacing={3}
                >
                  {stableSort(challenges.filter(challenge => (challenge.search == challSearch || challenge.phase.toLowerCase().includes(challSearch) || challenge.status.toLowerCase().includes(challSearch) || challenge.orgaTitle.toLowerCase().includes(challSearch) || challenge.orgaLocat.toLowerCase().includes(challSearch) || challenge.chatitle.toLowerCase().includes(challSearch) || challenge.type.toLowerCase().includes(challSearch) || challenge.score.toLowerCase().includes(challSearch) || challenge.theme.toLowerCase().includes(challSearch) || challenge.technology.toLowerCase().includes(challSearch))), getComparator(order, orderBy)).map((challenge) => (
                    <Grid
                      item
                      key={challenge.id}
                      lg={4}
                      md={6}
                      xs={12}
                    >
                      <Card className={classes.card}>
                        <CardActionArea onClick={(event) => { setChall(challenge.id); handleClick(event); }}>
                          <CardMedia
                            className={classes.media}
                            image="https://us.123rf.com/450wm/koblizeek/koblizeek1902/koblizeek190200055/125337077-kein-bildvektorsymbol-verf%C3%BCgbares-symbol-fehlt-keine-galerie-f%C3%BCr-diesen-moment-.jpg?ver=6"
                            title="Contemplative Reptile"
                          />
                          <CardContent>
                            <Typography align="left" gutterBottom variant="h6" component="h2">{challenge.orgaTitle}</Typography>
                            <Typography align="left" gutterBottom variant="h6" component="h2">{challenge.orgaLocat}</Typography>
                            <Typography align="left" gutterBottom variant="h6" component="h2">{challenge.orgaDate}</Typography>
                            <Typography align="left" gutterBottom variant="h6" component="h2">{challenge.chatitle}</Typography>
                            <Typography align="left" gutterBottom variant="h6" component="h2">{challenge.theme}</Typography>
                            <Typography align="left" gutterBottom variant="h6" component="h2">{challenge.technology}</Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  pt: 3
                }}
              >
              </Box>
            </Container>
          </Box>
        </div>
        <Popover
          props={props}
          className={classes.popup}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <div>
            {challenges.filter(challenge => challenge.id == chall).map(filteredChallenge => (
              <div align="left">
                <Popup
                  props={props}
                  handleClose={handleClose}
                  challenge={filteredChallenge}
                  fetchChallenges={fetchChallenges}
                />
              </div>
            ))}
          </div>
        </Popover>
      </Paper>
    </div>
  );
}