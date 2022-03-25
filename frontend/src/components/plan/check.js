import React, { Fragment } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Box } from "@mui/material";

const Area = styled(Box)({
  minHeight: 600,
  backgroundColor: "#90caf9",
  padding: 25,
  "&:hover": {
    backgroundColor: "#64b5f6",
    opacity: [0.9, 0.8, 0.7],
  },
});

const PlaceItem = styled(Box)({
  backgroundColor: "#e0e0e0",
  borderRadius: 16,
  padding: 15,
  margin: 15,
  "&:hover": {
    backgroundColor: "#bdbdbd",
    opacity: [0.9, 0.8, 0.7],
  },
});

const check = () => {
  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item md={3}>
          <Area>
            <div>날짜</div>

            <PlaceItem>여행지1</PlaceItem>
            <PlaceItem>여행지1</PlaceItem>
            <PlaceItem>여행지1</PlaceItem>
            <PlaceItem>여행지1</PlaceItem>
            <PlaceItem>여행지1</PlaceItem>
            <div>날짜</div>
            <PlaceItem>여행지1</PlaceItem>
          </Area>
        </Grid>
        <Grid item md={9}>
          <Area></Area>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default check;
