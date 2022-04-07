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

/* global kakao */
function DateDestinationPicker(props) {
  console.log(props);
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
    <MenuItem key={index} value={index}>
      {index + 1}일차 ({date.getMonth() + 1}월 {date.getDate()}일)
    </MenuItem>
  ));

  async function startPoint() {
    console.log("start");

    var marker = new kakao.maps.Marker({
      position: props.map.getCenter(),
      clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
    });
    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    // await kakao.maps.event.addListener(
    //   props.map,
    //   "click",
    //   function (mouseEvent) {
    //     // 클릭한 위도, 경도 정보를 가져옵니다
    //     var latlng = mouseEvent.latLng;

    //     // 지도를 클릭한 위치에 표출할 마커입니다
    //     marker = new kakao.maps.Marker({
    //       // 지도 중심좌표에 마커를 생성합니다
    //       position: latlng,
    //     });
    //   }
    // );

    marker.setMap(props.map);
    console.log(marker);
  }

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
          {props.point.startPlace ? (
            <Item onClick={startPoint}>출발지 선택</Item>
          ) : (
            <Item>출발지</Item>
          )}
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
          {props.point.endPlace ? (
            <Item>도착지 선택</Item>
          ) : (
            <Item>도착지</Item>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default DateDestinationPicker;
