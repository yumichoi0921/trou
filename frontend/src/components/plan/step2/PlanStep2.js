import React, { Fragment, useEffect, useState, useCallback } from "react";
import { styled } from "@mui/material/styles";

import Date from "../step1/Step1DatePicker";
import TagToggleButton from "../step1/TagToggleButton";
import { Paper, Grid } from "@mui/material";
import Area from "../child/Area";
import KakaoMap from "../step1/Step1KakaoMap";
import PlaceRecommendation from "./PlaceRecommendation";
import DateDetails from "./DateDetails";
import RecommendCourse from "./RecommandCourse";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function PlanStep2(props) {
  console.log(props);

  const [placeList, setPlaceList] = useState();

  return (
    <Grid className="container" container spacing={1} sx={{ height: "100%" }}>
      {/* Grid 왼쪽 부분 */}
      <Grid item md={3} sx={{ textAlign: "center", height: "100%" }}>
        <DateDetails
          plan={props.plan}
          date={props.date}
          setPlan={props.setPlan}
          selected={props.selected}
          placeList={placeList}
          setPlaceList={setPlaceList}
        ></DateDetails>
      </Grid>

      {/* Grid 지도 */}
      <Grid item md={6}>
        <Area sx={{ overflow: "auto" }}>
          <KakaoMap></KakaoMap>
        </Area>
      </Grid>

      {/* 오른쪽 추천 장소 */}
      <Grid item md={3} sx={{ height: "100%" }}>
        <Area sx={{ padding: 2, width: "100%" }}>
          {/* <Grid container sx={{ height: "100%" }}> */}
          <Grid
            item
            sx={{
              width: "100%",
              height: "50%",
              textAlign: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <PlaceRecommendation
              selected={props.selected}
              placeList={placeList}
              setPlaceList={setPlaceList}
            ></PlaceRecommendation>
          </Grid>
          {/* <Grid item sx={{ textAlign: "center", height: "70%" }}>
            <RecommendCourse placeName={"정방폭포"}></RecommendCourse>
          </Grid> */}
          {/* </Grid> */}
        </Area>
      </Grid>
    </Grid>
  );
}
