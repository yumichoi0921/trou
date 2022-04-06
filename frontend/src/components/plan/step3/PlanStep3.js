import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Stack } from "@mui/material";
import Route from "./child/Route";
import Area from "../child/Area";
import Step3KakaoMap from "./Step3KakaoMap";
import Dijkstra from "./Dijkstra";
import axios from "axios";

const PlanStep3 = (/*plan, setPlan*/) => {
  // const tmpRoutes = [
  //   {
  //     routeId: 0,
  //     routeDate: "2022-04-04",
  //     day: 1,
  //     order: [
  //       {
  //         tripOrder: 0,
  //         placeId: 128345,
  //         placeName: "start",
  //         mapX: 37.497625593121384,
  //         mapY: 127.02935713582038,
  //       },
  //       {
  //         tripOrder: 0,
  //         placeId: 125406,
  //         placeName: "A",
  //         mapX: 37.499427948430814,
  //         mapY: 127.02794423197847,
  //       },
  //       {
  //         tripOrder: 0,
  //         placeId: 125405,
  //         placeName: "B",
  //         mapX: 37.498553760499505,
  //         mapY: 127.02882598822454,
  //       },
  //       {
  //         tripOrder: 0,
  //         placeId: 126460,
  //         placeName: "end",
  //         mapX: 37.499590490909185,
  //         mapY: 127.0263723554437,
  //       },
  //     ],
  //   },
  // ];
  const tmpPlan = {
    startDate: "2022-04-04",
    endDate: "2022-04-06",
    routes: [
      {
        routeId: 0,
        routeDate: "2022-04-04",
        startPlace: {},
        endPlace: {},
        day: 1,
        order: [
          {
            tripOrder: 1,
            place: {
              placeId: 126438,
              placeName: "start",
              mapX: 126.5594730066,
              mapY: 33.2445341254,
            },
          },
          {
            tripOrder: 2,
            place: {
              placeId: 126445,
              placeName: "A",
              mapX: 126.908342042,
              mapY: 33.520231492,
            },
          },
          {
            tripOrder: 3,
            place: {
              placeId: 126452,
              placeName: "B",
              mapX: 126.7706788052,
              mapY: 33.5280478463,
            },
          },
          {
            tripOrder: 4,
            place: {
              placeId: 126456,
              placeName: "end",
              mapX: 126.5581440803,
              mapY: 33.4237615317,
            },
          },
        ],
      },
    ],
  };
  const navigate = useNavigate();

  const [plan, setPlan] = useState(tmpPlan);
  const [routes, setRoutes] = useState(plan.routes);

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
    console.log(plan);
    let newPlan = plan;
    try {
      // console.log(plan);
      // plan 저장
      data = { startDate: newPlan.startDate, endDate: newPlan.endDate };
      let response = await axios.post("/plan/" + userId, data);
      newPlan.planId = response.data.planId;

      console.log(newPlan.planId);
      // route 저장
      for (const route of newPlan.routes) {
        data = { routeDate: route.routeDate, day: route.day };
        const response = await axios.post("/route/" + newPlan.planId, data);
        route.routeId = response.data.routeId;
        console.log(route.routeId);
      }

      // order 저장
      for (const route of newPlan.routes) {
        const orderList = [];
        for (const p of route.order) {
          data = { tripOrder: p.tripOrder, place: p.place };
          orderList.push(data);
        }
        await axios.post("/order/" + route.routeId, orderList);
      }

      // navigate("/planDetail/${}");
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
                저장하기
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
