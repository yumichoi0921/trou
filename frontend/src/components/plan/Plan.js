import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Button, Stack, styled, Box, Grid } from "@mui/material";

import Step3KakaoMap from "./step3/Step3KakaoMap";
import Area from "./child/Area";
import PlanStep1 from "./step1/PlanStep1";
import PlanStep2 from "./step2/PlanStep2";
import KakaoMap from "./step3/Step3KakaoMap";
import PlanRecommendation from "./step2/PlaceRecommendation";
import { Link, Route, Router, Routes, useNavigate } from "react-router-dom";
import PlanStep3 from "./step3/PlanStep3";

export default function Plan() {
  const [tags, setTags] = useState([]);
  const [curPage, setPage] = useState(1);
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [plans, setPlans] = useState([]);
  return (
    <Fragment>
      <nav>
        <Link to="step1">step1</Link>
        <br></br>
        <Link to="step2">step2</Link>
        <br></br>
        <Link to="step3">step3</Link>
      </nav>

      <Routes>
        <Route
          path="*"
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
        <Route
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
        <Route path="step2" element={<h1>step2</h1>}></Route>
        <Route path="step3" element={<h1>step3</h1>}></Route>
      </Routes>
    </Fragment>
  );
}
