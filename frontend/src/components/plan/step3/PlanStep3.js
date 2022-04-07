import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Stack } from "@mui/material";
import Route from "./child/Route";
import Area from "../child/Area";
import Step3KakaoMap from "./Step3KakaoMap";
import Dijkstra from "./Dijkstra";
import axios from "axios";
import { useSelector } from "react-redux";

const PlanStep3 = (/*plan, setPlan*/) => {
  const navigate = useNavigate();

  const tmpPlan = useSelector((state) => state.sendData);
  const userId = useSelector((state) => state.userInfo.userId);
  console.log('step3 들어옴 : ', tmpPlan);
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

      navigate(`/plandetail/${newPlan.planId}`);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <Grid className="container" container spacing={1} sx={{ height: "100%" }}>
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
