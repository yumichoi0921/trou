import React, { Fragment, useState, useEffect } from "react";

import PlanStep1 from "./step1/PlanStep1";
import PlanStep2 from "./step2/PlanStep2";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import PlanStep3 from "./step3/PlanStep3";

export default function Plan() {
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [plan, setPlan] = useState({});

  const date = {
    startDate: startDate,
    setStartDate: setStartDate,
    endDate: endDate,
    setEndDate: setEndDate,
  };

  // const plan = {
  // planId:"",
  //   startDate: "",
  //   endDate: "",
  //   routes: [],
  // };

  const route = [
    {
      routeId: "",
      routeDate: "",
      day: "",
      order: [],
    },
  ];
  const order = [
    {
      tripOrder: 0,
      placeId: 128345,
      placeName: "여행지1",
      mapX: "",
      mapY: "",
    },
  ];

  const step2route = (
    <Route
      path="step2"
      element={
        <PlanStep2
          plan={plan}
          setPlan={setPlan}
          selectedTags={selectedTags}
          selectedRestaurants={selectedRestaurants}
          setSelectedRestaurants={setSelectedRestaurants}
        ></PlanStep2>
      }
    ></Route>
  );

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
          element={<Navigate replace to="step1"></Navigate>}
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
              date={date}
              step2route={step2route}
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
