import React, { useEffect } from "react";
import axios from "axios";


const OrderListBar = ({index, order}) => {
    const name = '';

    const getPlace = async () => {

    };
    // order.placeId
    useEffect(() => {
        getPlace();
    }, []);
    return (
        <p>{index}번째 {name}</p>
    );
};

export default OrderListBar;