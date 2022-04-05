import { Button } from "@mui/material";
import React from "react";

function RecommendedRestaurant(props) {
  function addRestaurant() {
    const selectedRestaurants = props.selectedRestaurants;
    selectedRestaurants.push(props.restaurant);
    props.setSelectedRestaurants(selectedRestaurants);
    console.log(selectedRestaurants);
  }
  return (
    <div>
      {props.restaurant.name} <Button onClick={addRestaurant}>추가</Button>
    </div>
  );
}

export default RecommendedRestaurant;
