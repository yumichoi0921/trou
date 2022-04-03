import React, { Fragment, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Grid, Button, Stack } from "@mui/material";
import Route from "./child/Route";
import Area from "../child/Area";
const Check = () => {
  const startDate = "2022-01-01";
  const endDate = "2022-01-02";

  const routeArray = [
    {
      routeId: 0,
      routeDate: "2022-03-01",
      day: 1,
      routePlaces: [
        { placeId: 128345, placeName: "여행지1" },
        { placeId: 125405, placeName: "여행지2" },
        { placeId: 125406, placeName: "여행지3" },
        { placeId: 125407, placeName: "여행지4" },
      ],
    },
    {
      routeId: 1,
      routeDate: "2022-03-02",
      day: 2,
      routePlaces: [
        { placeId: 128345, placeName: "여행지1" },
        { placeId: 125405, placeName: "여행지2" },
        { placeId: 125406, placeName: "여행지3" },
        { placeId: 125407, placeName: "여행지4" },
      ],
    },
  ];
  const [routes, setRoutes] = useState(routeArray);
  const routeList = routes.map((item, index) => (
    <Route
      key={item.routeId}
      index={index}
      route={item}
      routes={routes}
      orderSetter={setRoutes}
    />
  ));

  const save = async () => {
    // const url = "http://localhost:8080";
    const userId = 1;
    var data = {};
    try {
      data = { startDate: startDate, endDate: endDate };
      const plan = await axios.post("/plan/" + userId, data);
      const planId = plan.data.planId;

      for (const item of routes) {
        data = { routeDate: item.routeDate, day: item.day };
        const route = await axios.post("/route/" + planId, data);
        item.routeId = route.data.routeId;
      }

      for (const item of routes) {
        const orderList = [];
        for (let [index, place] of Object.entries(item.routePlaces)) {
          data = { tripOrder: Number(index) + 1, placeId: place.placeId };
          orderList.push(data);
        }
        await axios.post("/order/" + item.routeId, orderList);
      }
      alert("저장되었습니다.");
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <Fragment>
      {/* Grid 왼쪽 부분 */}
      <Grid item md={3} sx={{ textAlign: "center" }}>
        <Area sx={{ overflow: "auto" }}>
          <Stack spacing={2}>
            {routeList}
            <Stack
              spacing={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button variant="outlined">더 담으러 가기</Button>
              <Button variant="contained" onClick={save}>
                다음으로
              </Button>
            </Stack>
          </Stack>
        </Area>
      </Grid>
    </Fragment>
  );
};

export default Check;
