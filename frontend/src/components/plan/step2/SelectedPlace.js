import { Button } from "@mui/material";
import React from "react";
import Item from "../child/Item";

function SelectedPlan(props) {
  console.log(props);
  return (
    <Item>
      <Button>{props.place}</Button>
    </Item>
  );
}

export default SelectedPlan;
