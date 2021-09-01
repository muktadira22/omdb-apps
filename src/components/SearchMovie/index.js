import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MovieContext from "../../stores/movie/context";
import Pagination from "@material-ui/lab/Pagination";
import ListMovie from "../ListMovie";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
    },
  },
  card: {
    width: "100%",
  },
  media: {
    height: 200,
  },
  textField: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: 500,
    },
  },
  pagination: {
    width: "100%",
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
}));

const SearchMovie = () => {
  const [name, setName] = React.useState("");
  const classes = useStyles();

  const { listMovie, getMovieByName } = React.useContext(MovieContext);

  const searchMovie = (e) => {
    if (e.key === "Enter") {
      getMovieByName(name);
    }
  };

  const handleChangePagination = (e, value) => {
    getMovieByName(name, value);
  };

  return (
    <div className={classes.root}>
      <TextField
        className={classes.textField}
        id="outlined-basic"
        label="Search Movie"
        variant="outlined"
        style={{ marginBottom: 10 }}
        onKeyDown={searchMovie}
        onChange={(e) => setName(e.target.value)}
      />
      <Grid container diretion={"row"}>
        <Grid item>
          <ListMovie list={listMovie.results || []} />
        </Grid>

        {Array.isArray(listMovie.results) && listMovie.results.length > 0 ? (
          <Grid className={classes.pagination}>
            <Pagination
              count={listMovie.totalPages}
              page={listMovie.page}
              onChange={handleChangePagination}
              size="small"
              shape="rounded"
            />
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </div>
  );
};

export default SearchMovie;
