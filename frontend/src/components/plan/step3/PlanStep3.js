import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Button, Stack } from "@mui/material";
import Route from "./child/Route";
import Area from "../child/Area";
import Step3KakaoMap from "./Step3KakaoMap";
import Dijkstra from "./Dijkstra";
import axios from "axios";
import { useSelector } from "react-redux";

const PlanStep3 = ({ plan, setPlan }) => {
  const navigate = useNavigate();

  const tmpPlan = useSelector((state) => state.sendData);
  const userId = useSelector((state) => state.userInfo.userId);
  // const [plan, setPlan] = useState(tmpPlan);
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
    let newPlan = plan;
    try {
      // plan 저장
      data = { startDate: newPlan.startDate, endDate: newPlan.endDate };
      let response = await axios.post("/plan/" + userId, data);
      newPlan.planId = response.data.planId;

      // route 저장
      for (const route of newPlan.routes) {
        data = { routeDate: route.routeDate, day: route.day };
        const response = await axios.post("/route/" + newPlan.planId, data);
        route.routeId = response.data.routeId;
      }

      // order 저장
      for (const route of newPlan.routes) {
        const orderList = route.order.map((p, index) => {
          return { tripOrder: index + 1, place: p.place };
        });
        await axios.post("/order/" + route.routeId, orderList);
      }

      navigate(`/plandetail/${newPlan.planId}`);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <Grid className="container" container spacing={1} sx={{ height: "90%" }}>
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
              <Link to="/plan/step2">
                <Button variant="outlined">더 담으러 가기</Button>
              </Link>
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
