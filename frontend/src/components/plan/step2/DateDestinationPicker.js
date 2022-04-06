import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import Item from "../child/Item";

function DateDestinationPicker(props) {
  console.log(props.date);
  const dates = [];
  const i = new Date(props.date.startDate);
  while (i.getDate() <= props.date.endDate.getDate()) {
    dates.push(new Date(i));
    i.setDate(i.getDate() + 1);
  }

  const handleChange = (event) => {
    props.setSelectedDate(event.target.value);
  };

  const dateList = dates.map((date, index) => (
    <MenuItem value={index}>
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
          <Item>출발지</Item>
        </Grid>
        <Grid item md={7}>
          <Item>부산</Item>
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
          <Item>도착지</Item>
        </Grid>
        <Grid item md={7}>
          <Item>호텔</Item>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default DateDestinationPicker;
