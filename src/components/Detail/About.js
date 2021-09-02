import { Grid, Typography } from "@material-ui/core";
import React from "react";

const colTitle = {
  xs: 4,
};
const colValue = {
  xs: 8,
};

const AboutComponent = ({ data }) => {
  const RowComponent = ({ title, value }) => {
    if (typeof value !== "undefined" && value !== "N/A") {
      return (
        <>
          <Grid item {...colTitle}>
            <Typography variant="subtitle2">{title}</Typography>
          </Grid>
          <Grid item {...colValue}>
            <Typography variant="body2">{value}</Typography>
          </Grid>
        </>
      );
    }
    return "";
  };
  return (
    <Grid container spacing={2}>
      <RowComponent title={"Year"} value={data.Year} />
      <RowComponent title={"Genre"} value={data.Genre} />
      <RowComponent title={"Rated"} value={data.Rated} />
      <RowComponent title={"Released"} value={data.Released} />
      <RowComponent title={"Runtime"} value={data.Runtime} />
      <RowComponent title={"Director"} value={data.Director} />
      <RowComponent title={"Writer"} value={data.Writer} />
      <RowComponent title={"Actors"} value={data.Actors} />
      <RowComponent title={"Language"} value={data.Language} />
      <RowComponent title={"Country"} value={data.Country} />
      <RowComponent title={"Awards"} value={data.Awards} />
    </Grid>
  );
};

export default AboutComponent;
