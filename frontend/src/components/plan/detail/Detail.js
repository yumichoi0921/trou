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
import App from "../../../App";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginCheck, saveSendData } from "../../../store";

const Detail = () => {
  const { planId } = useParams();
  const [day, setDay] = React.useState(0);
  const [memoState, setMemoState] = useState(true);
  const [memo, setMemo] = useState(); // 서버에서 받아온 값으로 변경됨
  const [dList, setDList] = useState([]); // props로 받은거 넣기?
  const [routeId, setRouteId] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [sendData, setSendData] = useState({});

  /*  로그인 정보 확인 하는 변수  */
  const localStoragetokenCheck = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /*  로그인 정보 확인 하는 변수  */

  // useEffect(() => {
  //     if (Object.keys(sendData).length !== 0 && sendData.constructor === Object) {
  //         console.log(sendData);
  //     }
  // }, [sendData]);

  useEffect(() => {
    if (!localStoragetokenCheck) {
      alert("로그인 후 이용하세요.");
      document.location.href = "/login";
    }
    dispatch(loginCheck(userId));
    let routeList = null;
    let rId = null;
    let tmpRoute = [];
    let routeLen = null;
    let tmpSend = null;

    const checkMember = async () => {
      try {
        let check = false;
        const res = await axios.get(`/share/${planId}`);
        for (let i = 0; i < res.data.length; i++) {
          if (userId == res.data[i].userId) {
            check = true;
            break;
          }
        }
        if (!check) {
          alert("권한이 없습니다.");
          navigate("/");
          // document.location.href = '/';
        }
        await initRoute();
      } catch (e) {
        console.log(e);
      }
    };

    const initRoute = async () => {
      try {
        const response = await axios.get(`/route/${planId}`);
        rId = response.data[0].routeId;
        routeList = response.data;
        setDList(response.data);
        setMemo(response.data[0].memo);
        setRouteId(response.data[0].routeId);
        await initOrder();
        await initSendData();
        setSendData(tmpSend);
      } catch (e) {
        console.log(e);
      }
    };
    const initOrder = async () => {
      try {
        const res = await axios.get(`/order/${rId}`);
        setOrderList(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    const initSendData = async () => {
      try {
        routeLen = routeList.length;
        for (let idx = 0; idx < routeLen; idx++) {
          let id = routeList[idx].routeId;
          let date = routeList[idx].routeDate;
          let rday = routeList[idx].day;
          const res = await axios.get(`/order/${routeList[idx].routeId}`);
          let orders = res.data;
          let tmpOrder = [];
          for (let j = 0; j < orders.length; j++) {
            tmpOrder.push({
              tripOrder: orders[j].tripOrder,
              place: {
                placeId: orders[j].place.placeId,
                placeName: orders[j].place.placeName,
                mapX: orders[j].place.mapX,
                mapY: orders[j].place.mapY,
              },
            });
          }
          tmpRoute.push({
            routeId: id,
            routeDate: date,
            day: rday,
            order: tmpOrder,
          });
        }
        tmpSend = {
          startDate: routeList[0].routeDate,
          endDate: routeList[routeLen - 1].routeDate,
          routes: tmpRoute,
        };
      } catch (e) {
        console.log(e);
      }
    };
    checkMember();
  }, []);

  const ChangeOrderList = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `/order/${routeId}`,
        baseURL: "http://localhost:8080",
        timeout: 2000,
      });
      setOrderList(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const clickModifyBtn = () => {
    // dispatch(ChangeFlag());
    // dispatch(saveSendData(sendData));
    navigate("/");
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

  return (
    <Grid className="container" container spacing={1} sx={{ height: "90%" }}>
      {/* 왼쪽 시작 */}
      <Grid item md={4} sx={{ textAlign: "center", height: "100%" }}>
        <Area sx={{ padding: 2 }}>
          <Stack
            sx={{ height: "100%" }}
            spacing={2}
            divider={<Divider variant="middle" />}
          >
            <Local sx={{ height: "50%" }}>{memoContent}</Local>
            <Local sx={{ height: "50%" }}>
              <ShareFriends planId={planId}></ShareFriends>
            </Local>
          </Stack>
        </Area>
      </Grid>
      {/* 오른쪽 시작 */}
      <Grid item md={8} sx={{ height: "100%" }}>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Button variant="contained" onClick={clickModifyBtn}>
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
        <Grid item sx={{ width: "100%", height: "70%" }}>
          <Area sx={{ padding: 2 }}>
            <KakaoMap order={orderList} sx={{ overflow: "scroll" }}></KakaoMap>
          </Area>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Detail;
