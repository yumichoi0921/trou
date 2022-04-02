import Plan from './Plan';
import Button from "@mui/material/Button";
import styles from './MyPage.module.css';
import axios from "axios";
import React, { useState, useEffect } from "react";


const MyPage = () => {
    const [plans, setPlans] = useState([]);
    const userId = '1';
    //const result = await axios.get("/plan/" + userId);
    
    //console.log(result.data)
    //setPlans([...plans, result.data])
    useEffect(() => {
        async function getTags() {
          //const res = await axios.get("http://localhost:8080/tag");

          const result = await axios.get("/plan/" + userId);
          const temp = result.data;
          console.log(temp);
          setPlans(
            //result.data
            temp
          );
          //console.log(plans)
        }
        getTags();
        //console.log(plans);
      });

    return(
        <div>
            <Button className={styles.button} variant="text">삭제</Button>
            {plans.map((plan, index)=>(
                // <Plan key={plan.planId} startDate={plan.startDate}/>
                {index}
            ))}
        </div>
    )
}
export default MyPage