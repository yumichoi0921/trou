import { Button } from "@mui/material";
import React from "react";

function RecommendedPlace(props) {
  function addRestaurant() {
    const selectedPlace = props.selected.selectedPlace;
    if (!selectedPlace.includes(props.selected.selectedPlace))
      selectedPlace.push(props.restaurant);
    props.selected.setSelectedPlace(selectedPlace);
    console.log(selectedPlace);
  }
  return (
    <div>
      {props.restaurant.name} <Button onClick={addRestaurant}>추가</Button>
    </div>
  );
}

export default RecommendedPlace;
