import React from "react";
import Button from "@material-ui/core/Button";
import * as Icon from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const DetailButton = ({ data }) => {
  const history = useHistory();
  const classes = useStyles();

  const openDetail = (data) => {
    console.log(data);
    history.push(`/${data.imdbID}`);
  };
  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      className={classes.margin}
      onClick={() => openDetail(data)}
    >
      <Icon.Launch />
    </Button>
  );
};

export default DetailButton;
