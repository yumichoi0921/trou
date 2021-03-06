import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import Item from "../child/Item";

function DateDestinationPicker(props) {
  const startDate = new Date(props.date.startDate);
  startDate.setHours(0);
  props.date.endDate.setHours(0);
  const dates = [];
  // const startDate = new Date(props.date.startDate);
  while (
    startDate.getTime() <
    props.date.endDate.getTime() + 1000 * 3600 * 24
  ) {
    dates.push(new Date(startDate));
    startDate.setTime(startDate.getTime() + 1000 * 3600 * 24);
  }

  const handleChange = (event) => {
    props.setSelectedDate(event.target.value);
  };

  const dateList = dates.map((date, index) => (
    <MenuItem key={index} value={index}>
      {index + 1}일차 ({date.getMonth() + 1}월 {date.getDate()}일)
    </MenuItem>
  ));

  return (
    <Fragment>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Grid>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              날짜선택
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={props.selectedDate}
              onChange={handleChange}
              label="Date"
              defaultValue={0}
            >
              {dateList}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Grid item md={5}>
          <Item>출발</Item>
        </Grid>
        <Grid item md={7}>
            <Item>출발지</Item>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Grid item md={5}>
          <Item>도착</Item>
        </Grid>
        <Grid item md={7}>
            <Item>도착지</Item>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default DateDestinationPicker;
