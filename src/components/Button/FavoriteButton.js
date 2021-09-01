import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import * as Icon from "@material-ui/icons";
import MovieContext from "../../stores/movie/context";

const ButtonComponent = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    "&:hover": {
      backgroundColor: pink[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const FavoriteButton = ({ data }) => {
  const classes = useStyles();

  const { addToList, removeToList } = React.useContext(MovieContext);

  const favoriteClick = () => {
    if (data.isFavorited) removeToList(data);
    else addToList(data);
  };

  return (
    <ButtonComponent
      variant="contained"
      color="primary"
      size="small"
      onClick={favoriteClick}
      className={classes.margin}
    >
      {data.isFavorited ? <Icon.Favorite /> : <Icon.FavoriteBorder />}
    </ButtonComponent>
  );
};

export default FavoriteButton;
