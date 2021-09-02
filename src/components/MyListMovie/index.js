import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import * as Icon from "@material-ui/icons";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import "./index.css";
import { Typography } from "@material-ui/core";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import FavoriteButton from "../Button/FavoriteButton";
import MovieContext from "../../stores/movie/context";
import DetailButton from "../Button/DetailButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: 500,
    },
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageModal: {
    width: "50%",
  },
  fullList: {
    width: "auto",
    textAlign: "center",
    padding: theme.spacing(5, 2, 0),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const MyListMovie = () => {
  const classes = useStyles();

  const { removeToList, myList } = React.useContext(MovieContext);

  const [state, setState] = React.useState({
    isOpen: false,
    data: {},
  });

  // For Open / Close Drawer
  const openDetail = (data) => {
    setState({ ...state, isOpen: true, data });
  };

  // Lazy Image Component
  const LazyImage = ({ data }) => (
    <LazyLoadImage
      alt={data.Title}
      effect="blur"
      src={data.Poster}
      onClick={() => openDetail(data)}
    />
  );

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, isOpen: open });
  };

  const checkIsFavorited = (imdbID) => {
    const find = myList.find((x) => x.imdbID === imdbID);
    return find ? true : false;
  };

  const favoriteClick = (favorite, data) => {
    if (favorite) removeToList(data);
  };
  return (
    <div className={classes.root}>
      {myList.length > 0 && (
        <>
          <ImageList rowHeight={180} className={classes.imageList}>
            {myList.map((item, key) => (
              <ImageListItem key={key}>
                <LazyImage data={item} />
                <ImageListItemBar
                  title={item.Title}
                  subtitle={
                    <span>
                      {item.Type} / {item.Year}
                    </span>
                  }
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${item.Title}`}
                      className={classes.icon}
                      onClick={() => favoriteClick(item.isFavorited, item)}
                    >
                      {item.isFavorited ? (
                        <Icon.Favorite />
                      ) : (
                        <Icon.FavoriteBorder />
                      )}
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>

          <SwipeableDrawer
            anchor="bottom"
            open={state.isOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            disableSwipeToOpen={true}
            className="movie-drawer"
          >
            <div
              className={classes.fullList}
              role="presentation"
              onClick={toggleDrawer}
              onKeyDown={toggleDrawer}
            >
              <img
                className={classes.imageModal}
                src={state.data.Poster}
                alt={state.data.Title}
              />
              <Typography variant="h6" gutterisOpen>
                {state.data.Title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {state.data.Type} / {state.data.Year}
              </Typography>
              <FavoriteButton data={state.data} />
              <DetailButton data={state.data} />
            </div>
          </SwipeableDrawer>
        </>
      )}
    </div>
  );
};

export default MyListMovie;
