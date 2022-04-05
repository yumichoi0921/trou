import styles from './MyPage.module.css';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import { Fragment } from 'react';
import Place from './Place';
import Schedule from "./Schedule";
import {useParams} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";


const TripDetail = () => {
    const{planId} = useParams();   
    const [routes, setRoutes] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      const getRoutes = async () => {
        try {
          const response = await axios.get("/route/" + planId);
          setRoutes(response.data);
          console.log("여기")
          console.log(response.data)
          for (const route of response.data) {
            const response = await axios.get("/order/" + route.routeId);
            console.log("orders")
            setOrders(response.data);
            //console.log(route.routeId) //routeid: 32, 33
          }
      } catch (e) {
          console.log(e);
        }
      };
      getRoutes();
    }, []);

    const plan = {
        id: 1,
        text: '서울',
        startDate: '2021-03-28',
        endDate: '2021-04-01'
    };
    /*const orders = [
        {
          id: 1,
          routeId: 1,
          planId: '부산여행',
          place: '부산역',
          order: 1,
          review: 5
        },
        {
          id: 2,
          routeId: 1,
          planId: '부산여행',
          place: '수변공원',
          order: 2,
          review: 4
        },
        {
          id: 3,
          routeId: 1,
          planId: '부산여행',
          place: '자갈치시장',
          order: 3,
          review: 3
        },
        {
          id: 4,
          routeId: 1,
          planId: '부산여행',
          place: '해운대',
          order: 4,
          review: 2
        },
        {
          id: 5,
          routeId: 1,
          planId: '부산여행',
          place: '숙소',
          order: 5,
          review: 1
        },
        {
          id: 6,
          routeId: 2,
          planId: '부산여행',
          place: '남천동',
          order: 1,
          review: 3.5,
        },
        {
          id: 7,
          routeId: 2,
          planId: '부산여행',
          place: '남천동',
          order: 2,
          review: 2.5,
        },
        {
          id: 8,
          routeId: 2,
          planId: '부산여행',
          place: '남천동',
          order: 3,
          review: 5,
        },
        {
          id: 9,
          routeId: 2,
          planId: '부산여행',
          place: '남천동',
          order: 4,
          review: 4.0,
        },
        {
          id: 10,
          routeId: 2,
          planId: '부산여행',
          place: '남천동',
          order: 5,
          review: 3.1,
        },
    ];*/
    /*const routes = [
        {
            id: 1,
            planId: 1
        },
        {
            id: 2,
            planId: 1
        }
    ];*/

    return(
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <ListItem>
                        <div className={styles.image}>
                        </div>
                    </ListItem>
                </Grid>
                <Grid item xs={8}>
                    <ListItem>
                        <div className={styles.planInfo} >
                            <div>{plan.text}</div>
                            <div>{plan.startDate}~{plan.endDate}</div>
                        </div>
                        
                    </ListItem>
                </Grid>
                
                <Schedule></Schedule>
                {orders.map((order)=>(
                  <div>
                    <Place key={order.id} order={order} />
                  </div>
                ))}
            </Grid>                       
        </Fragment>
    )
}
export default TripDetail