import React, { Fragment, useState, useEffect } from "react";

import PlanStep1 from "./step1/PlanStep1";
import PlanStep2 from "./step2/PlanStep2";
import { Link, Route, Routes } from "react-router-dom";
import PlanStep3 from "./step3/PlanStep3";

export default function Plan({ st }) {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
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
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              plan={plan}
              setPlan={setPlan}
            ></PlanStep1>
          }
        ></Route>
        <Route
          path="step2"
          element={
            <PlanStep2
              plan={plan}
              setPlan={setPlan}
              selectedTags={selectedTags}
              selectedRestaurants={selectedRestaurants}
              setSelectedRestaurants={setSelectedRestaurants}
              st={st}
            ></PlanStep2>
          }
        ></Route>
        <Route
          path="step3"
          element={<PlanStep3 plan={plan} setPlan={setPlan} />}
        ></Route>
      </Routes>
    </Fragment>
  );
}
