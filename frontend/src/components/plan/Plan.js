import React, { Fragment, useEffect, useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Date from "./Date";
import PersonToggleButton from "./PersonToggleButton";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function FullWidthGrid() {
  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* Grid 오른쪽 부분 */}
          <Grid item xs={6} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={5}>
                가는 날
              </Grid>
              <Grid item xs={6} md={7}>
                <Date />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6} md={5}>
                돌아오는 날
              </Grid>
              <Grid item xs={6} md={7}>
                <Date />
              </Grid>
            </Grid>
            <Item>태그 선택</Item>
            <PersonToggleButton></PersonToggleButton>
          </Grid>

          {/* Grid 왼쪽 시작 */}
          <Grid item xs={6} md={8}>
            <Item>카카오지도</Item>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
