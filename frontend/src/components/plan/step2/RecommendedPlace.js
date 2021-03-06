import { Button } from "@mui/material";
import React from "react";
import SelectedPlace from "./SelectedPlace";

function RecommendedPlace(props) {
  function addPlace() {
    if (!props.selected.selectedPlace[props.selected.selectedDate])
      props.selected.selectedPlace[props.selected.selectedDate] = [];
    const selectedPlace =
      props.selected.selectedPlace[props.selected.selectedDate];
    if (!selectedPlace.includes(props.place)) {
      props.setPlaceList(
        selectedPlace.map((place, index) => (
          <SelectedPlace
            place={place.placeName}
            selected={props.selected}
            setPlaceList={props.setPlaceList}
          ></SelectedPlace>
        ))
      );
      selectedPlace.push(props.place);
    }
  }
  return (
    <div>
      {props.place.placeName} <Button onClick={addPlace}>추가</Button>
    </div>
  );
}

export default RecommendedPlace;
