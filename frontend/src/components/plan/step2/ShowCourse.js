import { Grid, Stack, Box } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import react, { useState, useEffect } from "react";
import Item from "../child/Item";

const ShowCourse = ({ course }) => {
  const [imgs, setImgs] = useState([]);
  const [count, setCount] = useState([]);

  function randoms() {
    return Math.floor(Math.random() * (5 - 1) + 1);
  }
  function Course(props) {
    return (
      <Box container style={{ float: "left" }}>
        <Box style={{ marginLeft: 15 }}>
          {props.place.placeName}

          {props.place.image && (
            <img src={props.place.image} alt=" " style={{ width: 100 }}></img>
          )}
          {!props.place.image && (
            <img
              src={`/imgs/img${randoms()}.jpg`}
              alt=""
              style={{ width: 100 }}
            ></img>
          )}
        </Box>
        <Box>{props.index !== course.length - 1 && <ArrowForward />}</Box>
      </Box>
    );
  }
  return (
    <div stlye={{ margin: "10" }}>
      <Stack direction="row">
        {course.map((order, index) => (
          <Course
            orderId={order.orderId}
            place={order.place}
            index={index}
            key={order.orderId}
            order={order.tripOrder}
          ></Course>
        ))}{" "}
      </Stack>
    </div>
  );
};

export default ShowCourse;
