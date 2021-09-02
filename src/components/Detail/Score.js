import { Grid, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React from "react";

const ScoreComponent = ({ data }) => {
  const RowComponentRating = ({ title, value, propsRating }) => {
    if (typeof value !== "undefined" && value !== "N/A") {
      return (
        <>
          <Grid item xs={12}>
            <Typography component="legend">{title}</Typography>
            <Rating
              name="read-only"
              value={value}
              readOnly
              precision={0.1}
              {...propsRating}
            />
          </Grid>
        </>
      );
    }
    return "";
  };
  const RowComponent = ({ title, value, propsRating }) => {
    if (typeof value !== "undefined" && value !== "N/A") {
      return (
        <>
          <Grid item xs={10}>
            <Typography component="subtitle2">{title}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography component="body2">{value}</Typography>
          </Grid>
        </>
      );
    }
    return "";
  };
  return (
    <Grid container spacing={2}>
      <RowComponentRating
        title={"IMDB Rating"}
        value={parseInt(data.imdbRating)}
        propsRating={{ max: 10 }}
      />
      {data.Ratings.length > 0 &&
        data.Ratings.map((item) => (
          <RowComponent title={item.Source} value={item.Value} />
        ))}
    </Grid>
  );
};

export default ScoreComponent;
