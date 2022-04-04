import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Plan from './Plan';

function Users() {
  const [plans, setPlans] = useState([]);
  const userId = 1;

 useEffect(() => {
    const getPlans = async () => {
      try {
        const response = await axios.get("/plan/" + userId);
        console.log(response.data);
        setPlans(response.data);     
        plans.forEach(element => console.log(element));
    } catch (e) {
        console.log(e);
      }
    };
    getPlans();
  }, []);

  return (
    <ul>
      {plans.map((plan) => (
        <Plan key={plan.planId} plan={plan}></Plan>
      ))}
      <Button></Button>
    </ul>
  );
}

export default Users;
