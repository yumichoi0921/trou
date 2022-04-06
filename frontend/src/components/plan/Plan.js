import React, { Fragment, useState, useEffect } from "react";

import PlanStep1 from "./step1/PlanStep1";
import PlanStep2 from "./step2/PlanStep2";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import PlanStep3 from "./step3/PlanStep3";
import axios from "axios";

export default function Plan() {
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState([]);
  const [plan, setPlan] = useState({});

  const date = {
    startDate: startDate,
    setStartDate: setStartDate,
    endDate: endDate,
    setEndDate: setEndDate,
  };

  const tag = {
    tags: tags,
    setTags: setTags,
    selectedTags: selectedTags,
    setSelectedTags: setSelectedTags,
  };

  const selected = {
    selectedPlace: selectedPlace,
    setSelectedPlace: setSelectedPlace,
  };

  useEffect(() => {
    async function getTags() {
      const res = await axios.get("http://localhost:8080/tag");
      const resTags = res.data;
      tag.setTags(
        resTags.map((resTag) => {
          const tag = {
            tagId: resTag.tagId,
            tagName: resTag.tagName,
            isSelected: false,
            color: "#e3f2fd",
          };
          return tag;
        })
      );
    }
    getTags();
  }, []);

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
          element={<Navigate replace to="step1"></Navigate>}
        ></Route>
        <Route
          path="step1"
          element={
            <PlanStep1
              tag={tag}
              plan={plan}
              setPlan={setPlan}
              date={date}
            ></PlanStep1>
          }
        ></Route>
        <Route
          path="step2"
          element={
            <PlanStep2
              plan={plan}
              setPlan={setPlan}
              date={date}
              selectedTags={selectedTags}
              selected={selected}
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
