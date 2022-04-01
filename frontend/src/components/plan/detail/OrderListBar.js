import React, { useEffect } from "react";
import axios from "axios";


const OrderListBar = ({index, order}) => {
    // let name = '';

    // const getPlace = async () => {
    //     try{
    //         const res = await axios({
    //             method: "get",
    //             url: `/place/detail/${order.placeId}`,    
    //             baseURL: "http://localhost:8080",
    //             timeout: 2000,
    //         });
    //         name = res.data.placeName;
    //     } catch{
    //         console.log('에러발생');
    //     }
    // };
    // // order.placeId
    // useEffect(() => {
    //     getPlace();
    // }, []);
    return (
        <div>
            {index}번째 장소 : {order.placeName} <br/>
            startTime :  {order.startTime}  <br/>
            endTime :  {order.endTime}
        </div>
    );
};

export default OrderListBar;