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
import { Link } from "react-router-dom";
import Area from "../child/Area";
import Item from "../child/Item";
import DateDestinationPicker from "./DateDestinationPicker";
import SelectedPlan from "./SelectedPlace";

function DateDetails(props) {
  const [date, setDate] = React.useState("");
  console.log(props);

  function confirmPlan() {}

  return (
    <Area sx={{ overflow: "auto" }} spacing={3}>
      <Grid>
        <DateDestinationPicker
          date={props.date}
          selectedDate={date}
          setSelectedDate={setDate}
        ></DateDestinationPicker>
      </Grid>
      <Grid>
        <SelectedPlan place={"장소"} selected={props.selected}></SelectedPlan>
      </Grid>

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
            일정생성
          </Button>
        </Stack>
      </Grid>
    </Area>
  );
}

export default DateDetails;
