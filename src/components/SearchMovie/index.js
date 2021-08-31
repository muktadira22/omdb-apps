import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import MovieContext from "../../stores/movie/context"
import Pagination from '@material-ui/lab/Pagination';
import Paginate from '../../utils/paginate';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '100%',
    },
  },
  card: {
    width: "100%",
  },
  media: {
    height: 200,
  },
}));


const SearchMovie = () => {
  const [name, setName] = React.useState("")
  const [paginate, setPaginate] = React.useState({})
  const [page, setPage] = React.useState(1)
  const classes = useStyles();

  const movieContext = React.useContext(MovieContext)
  const upcomingMovie = movieContext.state.upcoming.data
  const upcomingMovieTotal = movieContext.state.upcoming.total


  React.useEffect(() => {
    setPaginate((prevState) => ({
      ...prevState,
      ...Paginate(upcomingMovieTotal, page, 10, 10)
    }))

  }, [movieContext])
  const searchMovie = (e) => {
    if (e.key === 'Enter') {
      movieContext.getMovieByName(name)
    }
  }

  const handleChangePagination = (e, value) => {
    movieContext.getMovieByName(name, value)
    setPage(value)
  }

  return (
    <div className={classes.root}>
      <TextField id="outlined-basic" label="Search Movie" variant="outlined" style={{ marginBottom: 10 }} onKeyDown={searchMovie} onChange={(e) => setName(e.target.value)} />
      <Grid container diretion={"row"} spacing={1}>
        {upcomingMovie.length > 0 && upcomingMovie.map((item, key) => (
          <Grid item xs={6} md={3} key={key}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={item.Poster}
                  title={item.Title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    {item.Title}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Add
                </Button>
              </CardActions>
            </Card>
          </Grid>

        ))}

        {
          upcomingMovieTotal !== 0 ?
            <Pagination count={paginate.totalPages++} page={paginate.currentPage} onChange={handleChangePagination} />
            : ("")
        }

      </Grid>

    </div>

  )
}

export default SearchMovie
