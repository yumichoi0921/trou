import Date from "./Step1DatePicker";
import TagToggleButton from "./TagToggleButton";
import DateTagSelection from "./DateTagSelection";
import { Button, Stack, styled, Box, Grid } from "@mui/material";
import Area from "../child/Area";
import React, { useState, useEffect } from "react";
import KakaoMap from "./Step1KakaoMap";

const PlanStep1 = (props) => {
  return (
    <Grid className="container" container spacing={1} sx={{ height: "100%" }}>
      {/* Grid 왼쪽 부분 */}
      <Grid item md={3} sx={{ textAlign: "center", height: "100%" }}>
        <DateTagSelection
          tag={props.tag}
          plan={props.plan}
          setPlan={props.setPlan}
          date={props.date}
        ></DateTagSelection>
      </Grid>

      {/* Grid 지도 */}
      <Grid item md={9}>
        <Area sx={{ overflow: "auto" }}>
          <KakaoMap></KakaoMap>
        </Area>
      </Grid>
    </Grid>
  );
};

export default PlanStep1;
