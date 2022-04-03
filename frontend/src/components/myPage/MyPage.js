import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";

function Users() {
  const [plans, setPlans] = useState([]);
  const userId = 1;

  useEffect(() => {
    const getPlans = async () => {
      try {
        const response = await axios.get("/plan/" + userId);
        setPlans(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getPlans();
  }, []);

  return (
    <ul>
      {plans.map((plan) => (
        <li key={plan.planId}>{plan.planId}</li>
      ))}
      <Button></Button>
    </ul>
  );
}

export default Users;
