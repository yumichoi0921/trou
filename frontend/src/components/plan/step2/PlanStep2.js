import React, { Fragment, useEffect, useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Date from "../step1/Step1DatePicker";
import TagToggleButton from "../step1/TagToggleButton";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
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
    <Grid container spacing={1} sx={{ height: "100%" }}>
      {/* Grid 왼쪽 부분 */}
      <Grid item md={3} sx={{ textAlign: "center" }}>
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
      <Grid item md={3}>
        <Area sx={{ overflow: "auto" }}>
          <PlaceRecommendation
            selected={props.selected}
            placeList={placeList}
            setPlaceList={setPlaceList}
          ></PlaceRecommendation>
          <RecommendCourse placeName={"정방폭포"}></RecommendCourse>
        </Area>
      </Grid>
    </Grid>
  );
}
