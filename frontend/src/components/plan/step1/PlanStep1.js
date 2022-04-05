import Date from "../Date";
import TagToggleButton from "./TagToggleButton";
import DateTagSelection from "./DateTagSelection";
import { Button, Stack, styled, Box, Grid } from "@mui/material";
import Area from "../child/Area";
import React, { useState, useEffect } from "react";
import KakaoMap from "./Step1KakaoMap";

const PlanStep1 = (props) => {
  function nextPage() {
    if (props.curPage === 3) return;
    props.setPage(props.curPage + 1);
  }
  function prevPage() {
    if (props.curPage === 1) return;
    props.setPage(props.curPage - 1);
  }

  return (
    <Grid container spacing={1} sx={{ height: "100%" }}>
      {/* Grid 왼쪽 부분 */}
      <Grid item md={3} sx={{ textAlign: "center", height: "100%" }}>
        <DateTagSelection
          tags={props.tags}
          setTags={props.setTags}
          curPage={props.curPage}
          setPage={props.setPage}
          plan={props.plan}
          setPlan={props.setPlan}
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
