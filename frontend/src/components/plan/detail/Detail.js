/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* global kakao */
import React, { Fragment, useEffect, useState } from "react";
import { Grid, Box, Button, Stack, Divider, MenuItem } from "@mui/material";
import { Link, Routes, Route } from "react-router-dom";
import SelectDay from "./SelectDay";
import axios from "axios";
import OrderListBar from "./OrderListBar";
import Memo from "./Memo";
import ModifyMemo from "./ModifyMemo";
import Weather from "./Weather";
import ShareFriends from "./ShareFriends";
import KakaoMap from "../step3/Step3KakaoMap";
import Area from "../child/Area";
import Local from "../child/Local";
import PlanStep3_1 from "../step3/PlanStep3";
import App from "../../../App";

import { useParams } from "react-router-dom";

const Detail = () => {
    const { planId } = useParams();
    const [day, setDay] = React.useState(0);
    const [memoState, setMemoState] = useState(true);
    const [memo, setMemo] = useState();    // 서버에서 받아온 값으로 변경됨
    const [dList, setDList] = useState([]);    // props로 받은거 넣기?
    const [routeId, setRouteId] = useState(0);
    const [orderList, setOrderList] = useState([]);
    const [sendData, setSendData] = useState({});

    useEffect(() => {
        if(Object.keys(sendData).length !== 0 && sendData.constructor === Object){
            alert('HI');
            console.log(sendData);
        }
    }, [sendData]);

    useEffect(() => {
        let routeList = null;
        let rId = null;
        let tmpRoute = [];
        let routeLen = null;
        let tmpSend = null;
        const initRoute = async () => {
            try{
                const response = await axios.get(`/route/${planId}`);
                rId = response.data[0].routeId;
                routeList = response.data;
                setDList(response.data);
                setMemo(response.data[0].memo);
                setRouteId(response.data[0].routeId);
                await initOrder();
                await initSendData();
                console.log('tmpSend :  ', tmpSend);
                setSendData(tmpSend);
                // console.log('sendData : ', sendData);
            } catch(e){
                console.log('initRoute 오류');
            }
        };
        const initOrder = async () => {
            try{
                console.log(rId);
                const res = await axios.get(`/order/${rId}`);
                console.log('routeList : ', routeList);
                console.log('orderList : ', res.data);
                setOrderList(res.data);
            } catch(e){
                console.log('initOrder 오류');
            }
        };
        const initSendData = async () => {
            try{
                console.log("initSendData !!!", routeList);
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
                            placeId: orders[j].place.placeId,
                            placeName: orders[j].place.placeName,
                            mapX: orders[j].place.mapX,
                            mapY: orders[j].place.mapY,
                        });  
                    }
                    tmpRoute.push({
                        routeId: id,
                        routeDate: date,
                        day: rday,
                        order: tmpOrder
                    });
                }
                tmpSend = {
                    startDate: routeList[0].routeDate,
                    endDate: routeList[routeLen - 1].routeDate,
                    routes: tmpRoute
                };
            }catch(e){
                console.log('initSenData 오류');
            }
        };
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
            console.log('orderList : ', res.data);
            setOrderList(res.data);
        } catch {
            console.log('에러발생');
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
        <MenuItem value={index} key={index}>{item.day}일차 ({item.routeDate})</MenuItem>
    ));
    // setDayLists(lis);

    let memoContent = null;
    if (memoState) {  // 수정버튼 누르기 전 true
        memoContent = <Memo memo={memo} setMemoState={setMemoState}></Memo>
    } else {  // 수정버튼 누르고 난 후 false
        memoContent = <ModifyMemo day={day} dList={dList} memo={memo} setMemoState={setMemoState} setMemo={setMemo}></ModifyMemo>
    }

    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={4}>
                        <Area>
                            <Stack spacing={2} divider={<Divider variant="middle" />}>
                                <Local>
                                    {memoContent}
                                </Local>
                                <Local>
                                    <ShareFriends planId={19}></ShareFriends>
                                </Local>
                            </Stack>
                        </Area>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={2} >
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Button
                                        component={Link}
                                        to={"/plan/step3_1"}    //**************** 수정하는 페이지로 변경하기 ***************/ 
                                        variant="contained">
                                        수정하기
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <SelectDay day={day} lis={lis} handleChange={handleChange}></SelectDay>
                                </Grid>
                                <Grid item xs={3}>
                                    <Weather></Weather>
                                </Grid>
                            </Grid>
                            <OrderListBar orderList={orderList}></OrderListBar>
                        </Stack>
                        <Area sx={{ overflow: "auto" }}>
                            <KakaoMap plan={sendData}></KakaoMap>
                        </Area>
                    </Grid>
                </Grid>
            </Box>

            <Routes>
                <Route
                    path="/plan/step3_1"
                    element={<App></App>}
                // element={<PlanStep3_1 tmp={sendData} flag={true} />}
                ></Route>
            </Routes>
        </Fragment>
    );
};

export default Detail;