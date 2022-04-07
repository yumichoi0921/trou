import { Button } from "@mui/material";
import React from "react";
import react, { useState, useEffect } from "react";

import SelectedPlace from "./SelectedPlace";
import PlaceDetail from "./PlaceDetail";
function TagRelatedPlace(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
    console.log(selectedPlace);
    // const selectedPlace = props.selected.selectedPlace;
    // if (!selectedPlace.includes(props.restaurant))
    //   selectedPlace.push(props.restaurant);
    // props.selected.setSelectedPlace(selectedPlace);
    // console.log(selectedPlace);
  }
  function showDetail() {
    console.log(props.place);
    handleShow();
    console.log("show:" + show);
  }
  return (
    <div>
      <div onClick={showDetail}>
        {props.place.placeName} <Button onClick={addPlace}>추가</Button>
      </div>
      <PlaceDetail
        show={show}
        place={props.place}
        handleClose={handleClose}
      ></PlaceDetail>
    </div>
  );
}

export default TagRelatedPlace;
