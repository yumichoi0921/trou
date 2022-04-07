/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* global kakao */
import React, { Fragment, useEffect, useState } from "react";
import { Grid, Box, Button, Stack, Divider, MenuItem } from "@mui/material";
import { Link, Routes } from "react-router-dom";
import SelectDay from "./SelectDay";
import axios from "axios";
import OrderListBar from "./OrderListBar";
import Memo from "./Memo";
import ModifyMemo from "./ModifyMemo";
import Weather from "./Weather";
import ShareFriends from "./ShareFriends";
import KakaoMap from "./DetailKakaoMap";
import Area from "../child/Area";
import Local from "../child/Local";

import { useParams } from "react-router-dom";

const Detail = () => {
  const { planId } = useParams();
  const [day, setDay] = React.useState(0);
  const [memoState, setMemoState] = useState(true);
  const [memo, setMemo] = useState(); // 서버에서 받아온 값으로 변경됨
  const [dList, setDList] = useState([]); // props로 받은거 넣기?
  const [routeId, setRouteId] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [sendData, setSendData] = useState();

  const initSendData = (routeList) => {
    console.log("initSendData !!!");
    // 0번째는 이미 받았어 1번째부터 for문으로 받아서 저장하자.
    let routeLen = routeList.length;
    let tmpRoute = [];

    for (let idx = 0; idx < routeLen; idx++) {
      let id = routeList[idx].routeId;
      let date = routeList[idx].routeDate;
      let rday = routeList[idx].day;
      axios
        .get(`/order/${routeList[idx].routeId}`)
        .then((res) => {
          let orders = res.data;
          let tmpOrder = [];
          for (let j = 0; j < orders.length; j++) {
            tmpOrder.push({
              tripOrder: orders[j].tripOrder,
              place: orders[j].place,
            });
          }
          tmpRoute.push({
            routeId: id,
            routeDate: date,
            day: rday,
            order: tmpOrder,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log("tmpSend 넣어주는 곳");
    const tmpSend = {
      startDate: routeList[0].routeDate,
      endDate: routeList[routeLen - 1].routeDate,
      route: tmpRoute,
    };

    setSendData(tmpSend);
    console.log("으아아 센드데이터", tmpSend);
    // console.log(routes,orders);
  };

  const initRoute = async () => {
    // async ?
    try {
      console.log("init!!");
      const response = await axios({
        method: "get",
        url: `/route/${planId}`, // param으로 받은거로 검색
        baseURL: "http://localhost:8080",
        timeout: 2000,
      });
      console.log("route! : ", response.data);
      setDList(response.data);
      setMemo(response.data[0].memo);
      setRouteId(response.data[0].routeId);

      let rId = response.data[0].routeId;
      console.log("id : ", rId);
      try {
        const res = await axios({
          method: "get",
          url: `/order/${rId}`,
          baseURL: "http://localhost:8080",
          timeout: 2000,
        });
        console.log("orderList : ", res.data);
        setOrderList(res.data);

        await initSendData(response.data);
      } catch {
        console.log("에러발생");
      }
    } catch {
      console.log("에러발생");
    }
  };

  useEffect(() => {
    initRoute();
  }, []);

  const ChangeOrderList = async () => {
    try {
      // console.log(routeId);
      const res = await axios({
        method: "get",
        url: `/order/${routeId}`,
        baseURL: "http://localhost:8080",
        timeout: 2000,
      });
      console.log("orderList : ", res.data);
      setOrderList(res.data);
    } catch {
      console.log("에러발생");
    }
  };

  const handleChange = (event) => {
    let idx = event.target.value;
    setDay(idx);
    setMemo(dList[idx].memo);
    setRouteId(dList[idx].routeId);
    ChangeOrderList();
  };

  const lis = dList.map((item, index) => (
    <MenuItem value={index} key={index}>
      {item.day}일차 ({item.routeDate})
    </MenuItem>
  ));
  // setDayLists(lis);

  let memoContent = null;
  if (memoState) {
    // 수정버튼 누르기 전 true
    memoContent = <Memo memo={memo} setMemoState={setMemoState}></Memo>;
  } else {
    // 수정버튼 누르고 난 후 false
    memoContent = (
      <ModifyMemo
        day={day}
        dList={dList}
        memo={memo}
        setMemoState={setMemoState}
        setMemo={setMemo}
      ></ModifyMemo>
    );
  }
  const kmap = <KakaoMap order={orderList}></KakaoMap>;

  return (
    <Grid className="container" container spacing={1} sx={{ height: "100%" }}>
      <Grid item md={4} sx={{ textAlign: "center", height: "100%" }}>
        <Area sx={{ padding: 2 }}>
          <Stack
            sx={{ height: "100%" }}
            spacing={2}
            divider={<Divider variant="middle" />}
          >
            <Local sx={{ height: "50%" }}>{memoContent}</Local>
            <Local sx={{ height: "50%" }}>
              {/* <ShareFriends planId={19}></ShareFriends> */}
            </Local>
          </Stack>
        </Area>
      </Grid>
      <Grid item md={8} sx={{ height: "100%" }}>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Button
                component={Link}
                to={"step3"} //**************** 수정하는 페이지로 변경하기 ***************/
                variant="contained"
              >
                수정하기
              </Button>
            </Grid>
            <Grid item md={6}>
              <SelectDay
                day={day}
                lis={lis}
                handleChange={handleChange}
              ></SelectDay>
            </Grid>
            <Grid item md={3}>
              <Weather></Weather>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ pb: 1 }}>
          <OrderListBar orderList={orderList}></OrderListBar>
        </Grid>
        <Grid item sx={{ width: "100%", height: "60%" }}>
          <Area sx={{ padding: 2 }}>
            <KakaoMap order={orderList} sx={{ overflow: "scroll" }}></KakaoMap>
          </Area>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Detail;
