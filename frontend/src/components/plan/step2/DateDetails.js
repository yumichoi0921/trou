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

function DateDetails(props) {
  const navigate = useNavigate();
  console.log(props);

  function confirmPlan() {
    props.setPlan(
    props.selected.selectedPlace.map((p, index) => {
      
    }));
    navigate("step3");
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
    props.selected.selecctedPlace,
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
