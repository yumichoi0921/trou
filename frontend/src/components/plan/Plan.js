import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Button, Stack, styled, Box, Grid } from "@mui/material";

import KakaoMap from "./KakaoMap";
import Area from "./child/Area";
import Item from "./child/Item";
import Check from "./step3/Check";
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
      <Grid container spacing={1}>
        {/* Grid 왼쪽 부분 */}
        <Grid item md={3} sx={{ textAlign: "center" }}>
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
          {/* <Check></Check> */}
        </Grid>

        {/* Grid 오른쪽 */}
        <Grid item md={6}>
          <Area sx={{ overflow: "auto" }}>
            <KakaoMap></KakaoMap>
          </Area>
        </Grid>
        <Grid item md={3}>
          <Area sx={{ overflow: "auto" }}>
            <KakaoMap></KakaoMap>
          </Area>
        </Grid>
      </Grid>
    </Fragment>
  );
}
