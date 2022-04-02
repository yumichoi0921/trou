/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* global kakao */
import React, { Fragment, useEffect, useState } from "react";
import { styled, Grid, Box, Button, Stack, Paper, Divider, Menu, MenuItem, alpha, TextareaAutosize, Avatar, InputLabel, FormControl, Select } from "@mui/material";
import { Link } from "react-router-dom";
import SelectDay from "./SelectDay"
import axios from "axios";
import OrderListBar from "./OrderListBar";
import Memo from "./Memo";
import ModifyMemo from "./ModifyMemo";
import Weather from "./Weather";
import ShareFriends from "./ShareFriends";


const Area = styled(Box)({
    minHeight: '100%',
    backgroundColor: "#90caf9",
    padding: 25,
    "&:hover": {
        backgroundColor: "#64b5f6",
        opacity: [0.9, 0.8, 0.7],
    },
});

const Local = styled(Box)({
    // minHeight: '90%',
    backgroundColor: "#F1F9FA",
    padding: 25,
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const KakaoMap = () => {
    useEffect(() => {
        var container = document.getElementById("map");
        var options = {
            center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
            level: 3,
        };
        var map = new kakao.maps.Map(container, options);
    }, []);

    return (
        <div>
            <div id="map" style={{ width: "100%", height: "500px" }}></div>
        </div>
    );
};



const Detail = () => {
    const [day, setDay] = React.useState(0);
    const [memoState, setMemoState] = useState(true);
    const [memo, setMemo] = useState('1. 룰루 2. 랄라 3. 히히');    // 서버에서 받아온 값으로 변경됨
    const [dList, setDList] = useState([]);    // props로 받은거 넣기?
    const [routeId, setRouteId] = useState(0);
    const [orderList, setOrderList] = useState([]);

    const initRoute = async () => {  // async ? 
        try{
            console.log('init!!');
            const response = await axios({
                method: "get",
                url: `/route/19`,    // 2 -> props로 받아온 planId로 변경하기.
                baseURL: "http://localhost:8080",
                timeout: 2000,
            });
            // let routeIdList = response.data.map(route => route.routeId);
            // let routes = Array.from(response.data);
            
            setDList(response.data);
            setMemo(response.data[0].memo);
            setRouteId(response.data[0].routeId);

            let rId = response.data[0].routeId;
            console.log('id : ', rId);
            try{
                // console.log(routeId);
                const res = await axios({
                    method: "get",
                    url: `/order/${rId}`,    
                    baseURL: "http://localhost:8080",
                    timeout: 2000,
                });
                console.log('orderList : ', res.data);
                setOrderList(res.data);
            } catch{
                console.log('에러발생');
            }
        } catch{
            console.log('에러발생');
        }
    }
    
    useEffect(() => {
        initRoute();
    }, []);

    const ChangeOrderList = async () => {
        try{
            // console.log(routeId);
            const res = await axios({
                method: "get",
                url: `/order/${routeId}`,    
                baseURL: "http://localhost:8080",
                timeout: 2000,
            });
            console.log('orderList : ', res.data);
            setOrderList(res.data);
        } catch{
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

    const lis = dList.map((item,index) =>(
            <MenuItem value={index} key={index}>{item.day}일차 ({item.routeDate})</MenuItem>
    ));
    // setDayLists(lis);

    let memoContent = null;
    if (memoState) {  // 수정버튼 누르기 전 true
        memoContent = <Memo memo={memo} setMemoState={setMemoState}></Memo>
    } else {  // 수정버튼 누르고 난 후 false
        memoContent = <ModifyMemo memo={memo} setMemoState={setMemoState} setMemo={setMemo}></ModifyMemo>
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
                                    <ShareFriends></ShareFriends>
                                </Local>
                            </Stack>
                        </Area>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={3} >
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Button
                                        component={Link}
                                        to={"/"}    //**************** 수정하는 페이지로 변경하기 ***************/ 
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
                            {orderList.map((order,index) => (
                                <OrderListBar key={index} order={order}></OrderListBar>
                            ))}
                            {/* <Item>
                                <p>상태바 자리</p>
                            </Item> */}
                            <Item>
                                <KakaoMap></KakaoMap>
                            </Item>
                        </Stack>

                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
};

export default Detail;