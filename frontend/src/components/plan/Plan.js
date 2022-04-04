import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Button, Stack, styled, Box, Grid } from "@mui/material";

import Step3KakaoMap from "./step3/Step3KakaoMap";
import Area from "./child/Area";
import PlanStep1 from "./step1/PlanStep1";
import PlanStep2 from "./step2/PlanStep2";
import KakaoMap from "./step3/Step3KakaoMap";
import PlanRecommendation from "./step2/PlaceRecommendation";
import { Route, Routes } from "react-router-dom";

export default function Plan() {
  const [tags, setTags] = useState([]);
  const [curPage, setPage] = useState(1);
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [plans, setPlans] = useState([]);

  return (
    <Fragment>
      <Routes>
        <Route
          exact
          path="step1"
          element={
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
          }
        ></Route>
      </Routes>
    </Fragment>
  );
}
