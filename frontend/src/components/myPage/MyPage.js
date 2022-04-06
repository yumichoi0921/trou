import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Plan from "./Plan";

function Users() {
  const [plans, setPlans] = useState([]);

  const userId = 1;
  useEffect(() => {
    // console.log(plans);
    if (plans.length > 0) {
      console.log(plans);
      console.log(plans[15].routes[0].order[3].place);
      console.log(plans[15].routes[0].order[3].place.image);
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
    <ul>
      {plans.map((plan) => (
        <Plan key={plan.planId} plan={plan}>
          {" "}
        </Plan>
      ))}
      <Button></Button>
    </ul>
  );
}

export default Users;
