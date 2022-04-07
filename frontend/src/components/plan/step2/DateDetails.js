import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Area from "../child/Area";
import Item from "../child/Item";
import DateDestinationPicker from "./DateDestinationPicker";
import SelectedPlace from "./SelectedPlace";

// https://jsikim1.tistory.com/185
function convertDateFormat(date) {
  const m =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return `${date.getFullYear()}-${m}-${d}`;
}

function DateDetails(props) {
  function confirmPlan() {
    const routes = props.selected.selectedPlace.map((r, routeIndex) => {
      const route = {};
      const places = r.map((p, placeIndex) => {
        const place = p.placeId
          ? {
              tripOrder: placeIndex + 1,
              place: {
                placeId: p.placeId,
                placeName: p.placeName,
                mapX: p.mapX,
                mapY: p.mapY,
              },
            }
          : {
              tripOrder: placeIndex + 1,
              place: {
                placeName: p.placeName,
                mapX: p.mapX,
                mapY: p.mapY,
              },
            };
        return place;
      });

      const date = new Date(props.date.startDate);
      date.setTime(date.getTime() + routeIndex * 1000 * 3600 * 24);
      route.routeId = "";
      route.routeDate = convertDateFormat(date);
      route.startPlace = props.point.startPlace[routeIndex];
      route.endPlace = props.point.endPlace[routeIndex];
      route.day = routeIndex + 1;
      route.order = places; //배열
      if (props.point.startPlace[routeIndex]) {
        route.order.unshift({
          tripOrder: 0,
          place: props.point.startPlace[routeIndex],
        });
      }
      if (props.point.endPlace[routeIndex]) {
        route.order.push({
          tripOrder: 0,
          place: props.point.endPlace[routeIndex],
        });
      }
      return route;
    });
    const plan = {
      startDate: convertDateFormat(props.date.startDate),
      endDate: convertDateFormat(props.date.endDate),
      routes: routes,
    };
    props.setPlan(plan);
    console.log(plan);
  }

  const [placeList, setPlaceList] = useState();
  //   const placeList = places.map((place, index) => (
  //     <SelectedPlace place={place} selected={props.selected}></SelectedPlace>
  //   ));

  React.useEffect(() => {
    const selectedPlace = props.selected.selectedPlace[
      props.selected.selectedDate
    ]
      ? props.selected.selectedPlace[props.selected.selectedDate]
      : [];
    setPlaceList(
      selectedPlace.map((place, index) => (
        <SelectedPlace
          key={index}
          place={place}
          selected={props.selected}
          setPlaceList={props.setPlaceList}
        ></SelectedPlace>
      ))
    );
  }, [
    props.selected.selectedDate,
    props.selected.selectedPlace,
    props.placeList,
  ]);

  return (
    <Area sx={{ overflow: "auto" }} spacing={3}>
      <Grid>
        <DateDestinationPicker
          date={props.date}
          selectedDate={props.selected.selectedDate}
          setSelectedDate={props.selected.setSelectedDate}
          point={props.point}
        ></DateDestinationPicker>
      </Grid>
      <Grid>{placeList}</Grid>

      <Grid item>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          mt={3}
          mr={3}
          ml={3}
        >
          <Button variant="outlined">
            <Link to="/plan/step1">뒤로가기</Link>
          </Button>
          <Button variant="contained" onClick={confirmPlan}>
            <Link to="/plan/step3">일정생성</Link>
          </Button>
        </Stack>
      </Grid>
    </Area>
  );
}

export default DateDetails;
