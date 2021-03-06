import { Button } from "@mui/material";
import React from "react";
import Item from "../child/Item";

function SelectedPlace(props) {
  function remove() {
    const selectedPlace =
      props.selected.selectedPlace[props.selected.selectedDate];
    for (let i = 0; i < selectedPlace.length; i++) {
      if (selectedPlace[i] === props.place) {
        selectedPlace.splice(i, 1);
        props.setPlaceList(
          selectedPlace.map((place, index) => (
            <SelectedPlace
              place={place.placeName}
              selected={props.selected}
            ></SelectedPlace>
          ))
        );
        break;
      }
    }
  }
  return (
    <Item mb={1} onClick={remove}>
      <Button>{props.place.placeName}</Button>
    </Item>
  );
}

export default SelectedPlace;
