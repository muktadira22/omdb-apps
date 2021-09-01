import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import * as Icon from '@material-ui/icons'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import "./index.css"
import { Typography } from '@material-ui/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    [theme.breakpoints.down('sm')]: {
      width: "100%"
    },
    [theme.breakpoints.up('md')]: {
      width: 500
    },
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageModal: {
    width: "50%"
  },
  fullList: {
    width: 'auto',
    textAlign: "center",
    padding: theme.spacing(5, 2, 0),
  },
}));

const ListMovie = ({ list }) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    isOpen: false,
  });

  // For Open / Close Drawer
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, isOpen: open });
  };

  // Lazy Image Component
  const LazyImage = ({ image }) => (
    <LazyLoadImage
      alt={image.alt}
      effect="blur"
      src={image.src} />
  );

  // Drawer Component Detail
  const DrawerDetail = () => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <img className={classes.imageModal} src="https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_SX300.jpg" alt="test gambar" />
      <Typography variant="h6" gutterisOpen>
        Captain Marvel
      </Typography>
    </div>
  );

  return (
    <div className={classes.root}>
      {list.length > 0 && <>
        <ImageList rowHeight={180} className={classes.imageList}>
          <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">
              Search Result : {"Marvel"}
            </ListSubheader>
          </ImageListItem>
          {list.map((item, key) => (
            <ImageListItem onClick={toggleDrawer(true)} key={key}>
              <LazyImage
                image={{ src: item.Poster, alt: item.Title }}
              />
              <ImageListItemBar
                title={item.Title}
                subtitle={<span>{item.Type} / {item.Year}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${"Captain Marvel"}`} className={classes.icon}>
                    <Icon.FavoriteBorder />
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
          <DrawerDetail />
        </SwipeableDrawer>
      </>}
    </div>

  )
}

export default ListMovie
