import { Button } from "@mui/material";
import React from "react";
import Item from "../child/Item";

function SelectedPlace(props) {
  console.log(props);
  return (
    <Item>
      <Button>abcd</Button>
    </Item>
  );
}

export default SelectedPlace;
