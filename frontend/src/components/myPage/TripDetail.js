import styles from './MyPage.module.css';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import { Fragment } from 'react';
import Place from './Place';
import Schedule from "./Schedule";
import {useParams} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SelectDay from './SelectDay';
import { MenuItem } from '@mui/material';
import OrderListBar from "./OrderListBar";


const TripDetail = () => {
    const{planId} = useParams();   
    const [routes, setRoutes] = useState([]); //현재 계획에 속한 모든 루트
    const [orders, setOrders] = useState([]);
    const [day, setDay] = React.useState(0);
    const [routeId, setRouteId] = useState(0);
    const [route, setRoute] = useState(); //현재 선택된 날의 루트
    
    useEffect(() => {
      let newRoutes = [];

      const getOrders = async () => {
        try {
          for(const [index, route] of newRoutes.entries()){
            const response = await axios.get("/order/" + route.routeId);
            const order = response.data;       
            route.order = order;
          }
        } catch (e) {
          console.log(e);
        }
      };

      const getRoutes = async () => {
        try {
          const response = await axios.get("/route/" + planId);
          const routes = response.data;
          newRoutes = response.data
          await getOrders()
          setRoutes(newRoutes)
          //console.log("루트 출력");
          //console.log(routes)    
        } catch (e) {
          console.log(e);
        }
      };
      getRoutes();
    }, []);

    const handleChange = (event) => {
      let idx = event.target.value;
      setDay(idx);
      setRouteId(routes[idx].routeId);
      changeOrderList(idx);
    };

    const changeOrderList = (idx) => {
      console.log("change orderList")
      console.log(idx)
      console.log(routes[idx])
      setRoute(routes[idx])
    };

    console.log("여기")
    console.log(routes)
    const lis = routes.map((route, index) => (
      <MenuItem value={index} key={index}>{route.day}일차 ({route.routeDate})</MenuItem>
    ))

    return(
        <Fragment>
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <ListItem>
                        <div className={styles.image}>
                        </div>
                    </ListItem>
                </Grid>
                <Grid item xs={8}>
                    <ListItem>
                    <div className={styles.planInfo} >
                      {
                        routes.length > 0 && routes[0].order.length > 0?
                        <div>{routes[0].order[0].region.substring(0, routes[0].order[0].region.indexOf(' '))}<br></br>
                        {routes[0].routeDate}~{routes[routes.length-1].routeDate}</div>:
                        <div>{"지역없음"}</div>
                      }
                    </div>
                    </ListItem>
                </Grid>
            
                <Grid item xs={3}>
                  <ListItem>
                    {
                      routes.length>0?
                      <SelectDay day={day} handleChange={handleChange} lis={lis}>
                      </SelectDay>:
                      console.log("no routes")
                    }
                    </ListItem>
                </Grid>
                <Grid item xs={9}>
                  <ListItem>
                    {
                      route &&
                      <OrderListBar route={route}></OrderListBar>
                    }
                  </ListItem>
                </Grid>

                {routes.map((route)=>(
                  <div>
                      <Place key={route.routeId} route={route} />
                  </div>
                ))}
            </Grid>    
        </Fragment>
    )
}
export default TripDetail