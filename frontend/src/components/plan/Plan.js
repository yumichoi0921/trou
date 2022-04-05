import React, { Fragment, useState, useEffect } from "react";

import PlanStep1 from "./step1/PlanStep1";
import PlanStep2 from "./step2/PlanStep2";
import { Link, Route, Routes } from "react-router-dom";
import PlanStep3 from "./step3/PlanStep3";

export default function Plan() {
  const [tags, setTags] = useState([]);
  const [curPage, setPage] = useState(1);
  const [plan, setPlan] = useState({});

  return (
    <Fragment>
      {/* <nav>
        <Link to="step1">step1</Link>
        <br></br>
        <Link to="step2">step2</Link>
        <br></br>
        <Link to="step3">step3</Link>
      </nav> */}

      <Routes>
        <Route
          path="*"
          element={
            <PlanStep1
              tags={tags}
              setTags={setTags}
              curPage={curPage}
              setPage={setPage}
              plan={plan}
              setPlan={setPlan}
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
            ></PlanStep1>
          }
        ></Route>
        <Route path="step2" element={<h1>step2</h1>}></Route>
        <Route
          path="step3"
          element={<PlanStep3 plan={plan} setPlan={setPlan} />}
        ></Route>
      </Routes>
    </Fragment>
  );
}
