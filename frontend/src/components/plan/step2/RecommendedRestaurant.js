import { Button } from "@mui/material";
import React from "react";
import SelectedPlace from "./SelectedPlace";

function RecommendedRestaurant(props) {
  function addPlace() {
    if (!props.selected.selectedPlace[props.selected.selectedDate])
      props.selected.selectedPlace[props.selected.selectedDate] = [];
    const selectedPlace =
      props.selected.selectedPlace[props.selected.selectedDate];
    if (!selectedPlace.includes(props.place)) {
      props.setPlaceList(
        selectedPlace.map((place) => (
          <SelectedPlace
            place={place}
            selected={props.selected}
          ></SelectedPlace>
        ))
      );
      selectedPlace.push(props.place);
    }
    console.log(selectedPlace);
    // const selectedPlace = props.selected.selectedPlace;
    // if (!selectedPlace.includes(props.restaurant))
    //   selectedPlace.push(props.restaurant);
    // props.selected.setSelectedPlace(selectedPlace);
    // console.log(selectedPlace);
  }
  return (
    <div>
      {props.place.name} <Button onClick={addPlace}>추가</Button>
    </div>
  );
}

export default RecommendedRestaurant;
