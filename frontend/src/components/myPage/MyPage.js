import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import Plan from "./Plan";

function Users() {
  const [plans, setPlans] = useState([]);

  const userId = 1;
  useEffect(() => {
    if (plans.length > 0) {
      console.log(plans);
    }
  }, [plans]);

  useEffect(() => {
    let newPlans = [];
    const getOrders = async () => {
      try {
        for (const [p, plan] of newPlans.entries()) {
          for (const [r, route] of plan.routes.entries()) {
            const response = await axios.get("/order/" + route.routeId);
            const order = response.data;
            newPlans[p].routes[r].order = order;
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    const getRoutes = async () => {
      try {
        for (const [index, plan] of newPlans.entries()) {
          const response = await axios.get("/route/" + plan.planId);
          const routes = response.data;
          newPlans[index].routes = routes;
        }
      } catch (e) {
        console.log(e);
      }
    };

    const getPlans = async () => {
      try {
        const response = await axios.get("/plan/" + userId);
        newPlans = response.data;
        await getRoutes();
        await getOrders();
        setPlans(newPlans);
      } catch (e) {
        console.log(e);
      }
    };
    getPlans();
  }, []);

  return (
    <Grid className="container" container spacing={1} sx={{ height: "100%" }}>
      {plans.map((plan) =>
        plan.routes.length > 0 && plan.routes[0].order.length > 0 ? (
          <Plan
            key={plan.planId}
            plan={plan}
            image={plan.routes[0].order[3].place.image}
            region={plan.routes[0].order[0].region}
          ></Plan>
        ) : (
          <Plan key={plan.planId} plan={plan} image={null}></Plan>
        )
      )}
      <Button></Button>
    </Grid>
  );
}
export default Users;
