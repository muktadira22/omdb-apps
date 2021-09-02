import { Grid, Typography } from "@material-ui/core";
import React from "react";

const SynopsisComponent = ({ data }) => {
  const RowComponent = ({ value }) => {
    if (typeof value !== "undefined" && value !== "N/A") {
      return (
        <>
          <Grid item xs={12}>
            <Typography variant="body">{value}</Typography>
          </Grid>
        </>
      );
    }
    return "";
  };
  return (
    <Grid container spacing={2}>
      <RowComponent value={data.Plot} />
    </Grid>
  );
};

export default SynopsisComponent;
