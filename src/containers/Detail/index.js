import React from "react";
import BaseLayout from "../../components/BaseLayout";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import { About, Synopsis, Score } from "../../components/Detail";
import MovieContext from "../../stores/movie/context";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  paperTab: {
    flexGrow: 1,
  },
});

const DetailPage = () => {
  const { id } = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const { getMovieById, removeToList, addToList } =
    React.useContext(MovieContext);

  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  React.useEffect(() => {
    console.log("res");

    getMovieById(id, function (res) {
      setState(res);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const favoritedClick = () => {
    console.log({
      Title: state.Title,
      Type: state.Type,
      imdbID: state.imdbID,
      Poster: state.Poster,
      Year: state.Year,
    });
    if (state.isFavorited) {
      removeToList({
        Title: state.Title,
        Type: state.Type,
        imdbID: state.imdbID,
        Poster: state.Poster,
        Year: state.Year,
      });
      setState({ ...state, isFavorited: false });
    } else {
      addToList({
        Title: state.Title,
        Type: state.Type,
        imdbID: state.imdbID,
        Poster: state.Poster,
        Year: state.Year,
      });
      setState({ ...state, isFavorited: true });
    }
  };

  return (
    <BaseLayout>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={state.Title}
            image={state.Poster}
            title={state.Title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {state.Title}
            </Typography>
            <Typography gutterBottom variant="body2">
              {state.Type}
            </Typography>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              variant="fullWidth"
            >
              <Tab label="About" />
              <Tab label="Synopsis" />
              <Tab label="Score" />
            </Tabs>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <About data={state} />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Synopsis data={state} />
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <Score data={state} />
              </TabPanel>
            </SwipeableViews>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={favoritedClick}>
            {state.isFavorited ? "Remove From My List" : "Add to My List"}
          </Button>
        </CardActions>
      </Card>
    </BaseLayout>
  );
};

export default DetailPage;
