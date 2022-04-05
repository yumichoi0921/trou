import React, { Fragment, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Grid, Button, Stack } from "@mui/material";
import Route from "./child/Route";
import Area from "../child/Area";
import Step3KakaoMap from "./Step3KakaoMap";
import Dijkstra from "./Dijkstra";

const PlanStep3 = (/*plan, setPlan*/) => {
  const tmpRoutes = [
    {
      routeId: 0,
      routeDate: "2022-04-04",
      day: 1,
      order: [
        {
          tripOrder: 0,
          placeId: 128345,
          placeName: "start",
          mapX: 37.497625593121384,
          mapY: 127.02935713582038,
        },
        {
          tripOrder: 0,
          placeId: 125406,
          placeName: "A",
          mapX: 37.499427948430814,
          mapY: 127.02794423197847,
        },
        {
          tripOrder: 0,
          placeId: 125405,
          placeName: "B",
          mapX: 37.498553760499505,
          mapY: 127.02882598822454,
        },
        {
          tripOrder: 0,
          placeId: 126460,
          placeName: "end",
          mapX: 37.499590490909185,
          mapY: 127.0263723554437,
        },
      ],
    },
  ];
  const tmpPlan = {
    startDate: "2022-04-04",
    endDate: "2022-04-06",
    routes: [
      {
        routeId: 0,
        routeDate: "2022-04-04",
        day: 1,
        order: [
          {
            tripOrder: 0,
            placeId: 128345,
            placeName: "start",
            mapX: 37.497625593121384,
            mapY: 127.02935713582038,
          },
          {
            tripOrder: 0,
            placeId: 125406,
            placeName: "A",
            mapX: 37.499427948430814,
            mapY: 127.02794423197847,
          },
          {
            tripOrder: 0,
            placeId: 125405,
            placeName: "B",
            mapX: 37.498553760499505,
            mapY: 127.02882598822454,
          },
          {
            tripOrder: 0,
            placeId: 126460,
            placeName: "end",
            mapX: 37.499590490909185,
            mapY: 127.0263723554437,
          },
        ],
      },
    ],
  };

  const [routes, setRoutes] = useState(tmpRoutes);
  const [plan, setPlan] = useState(tmpPlan);

  useEffect(() => {
    let newPlan = { ...plan };
    newPlan.routes = routes;
    setPlan(newPlan);
  }, [routes]);

  useEffect(() => {
    async function getShortestPath() {
      let newRoutes = [];
      for (const route of plan.routes) {
        let newRoute = { ...route };
        let order = [];
        await Dijkstra(route.order).then((result) => {
          order = result;
        });
        newRoute.order = order;
        newRoutes.push(newRoute);
      }
      setRoutes(newRoutes);
    }
    getShortestPath();
  }, []);

  const routeList = plan.routes.map((route, index) => (
    <Route
      key={route.routeId}
      index={index}
      route={route}
      routes={plan.routes}
      setRoutes={setRoutes}
    />
  ));

  const save = async () => {
    // const url = "http://localhost:8080";
    const userId = 1;
    var data = {};
    try {
      // plan 저장
      data = { startDate: plan.startDate, endDate: plan.endDate };
      const plan = await axios.post("/plan/" + userId, data);
      const planId = plan.data.planId;

      // route 저장
      for (const route of plan.routes) {
        data = { routeDate: route.routeDate, day: route.day };
        const route = await axios.post("/route/" + planId, data);
        route.routeId = route.data.routeId;
      }

      // order 저장
      for (const route of plan.routes) {
        const orderList = [];
        for (const order of route) {
          data = { tripOrder: order.tripOrder, placeId: order.placeId };
          orderList.push(data);
        }
        await axios.post("/order/" + route.routeId, orderList);
      }

      alert("저장되었습니다.");
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <Grid container spacing={1} sx={{ height: "100%" }}>
      {/* Grid 왼쪽 부분 */}
      <Grid item md={3} sx={{ textAlign: "center", height: "100%" }}>
        <Area>
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
      {/* Grid 오른쪽 지도 */}
      <Grid item md={9} sx={{ height: "100%" }}>
        <Area sx={{ overflow: "auto" }}>
          <Step3KakaoMap plan={plan}></Step3KakaoMap>
        </Area>
      </Grid>
    </Grid>
  );
};

export default PlanStep3;
