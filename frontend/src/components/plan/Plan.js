import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Button, Stack, styled, Box, Grid } from "@mui/material";

import Step3KakaoMap from "./step3/Step3KakaoMap";
import Area from "./child/Area";
import PlanStep1 from "./step1/PlanStep1";
import PlanStep2 from "./step2/PlanStep2";

export default function Plan() {
  const [tags, setTags] = useState([]);
  const [curPage, setPage] = useState(1);
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [plans, setPlans] = useState([]);

  return (
    <Fragment>
      <Grid container spacing={1} sx={{ height: "100%" }}>
        {/* Grid 왼쪽 부분 */}
        <PlanStep1
          tags={tags}
          setTags={setTags}
          curPage={curPage}
          setPage={setPage}
          beginDate={beginDate}
          setBeginDate={setBeginDate}
          endDate={endDate}
          setEndDate={setEndDate}
        ></PlanStep1>
        {/* <PlanStep2></PlanStep2> */}
        {/* <Check></Check> */}
        {/* Grid 오른쪽 */}
        <Grid item md={9}>
          <Area sx={{ overflow: "auto" }}>
            <Step3KakaoMap></Step3KakaoMap>
          </Area>
        </Grid>
      </Grid>
    </Fragment>
  );
}
