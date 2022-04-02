import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Button, Stack, styled, Box, Grid } from "@mui/material";

import KakaoMap from "./KakaoMap";
import Area from "./child/Area";
import Item from "./child/Item";
import Check from "./step3/Check";
import PlanStep1 from "./step1/PlanStep1";

export default function FullWidthGrid() {
  const [tags, setTags] = useState([]);
  const [curPage, setPage] = useState(1);

  return (
    <Fragment>
      <Grid container spacing={1}>
        {/* Grid 왼쪽 부분 */}
        <PlanStep1
          tags={tags}
          setTags={setTags}
          curPage={curPage}
          setPage={setPage}
        ></PlanStep1>
        <Check></Check>
        {/* Grid 오른쪽 */}
        <Grid item md={9}>
          <Area sx={{ overflow: "auto" }}>
            <KakaoMap></KakaoMap>
          </Area>
        </Grid>
      </Grid>
    </Fragment>
  );
}
