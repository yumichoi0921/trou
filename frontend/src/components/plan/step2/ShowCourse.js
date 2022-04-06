import { Grid, Stack, Box } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import react, { useState, useEffect } from "react";
import SelectedPlace from "./SelectedPlace";

const ShowCourse = ({ selected, course, setPlaceList }) => {
  const [imgs, setImgs] = useState([]);
  const [count, setCount] = useState([]);

  function randoms() {
    return Math.floor(Math.random() * (5 - 1) + 1);
  }

  function addCourse() {
    if (course.length === 0) {
      course = [];
    }
    console.log("course:" + course[0]);
    // course.forEarch((c) => {
    //   if (!selected.selectedPlace[selected.selectedDate])
    //     selected.selectedPlace[selected.selectedDate] = [];
    //   const selectedPlace = selected.selectedPlace[selected.selectedDate];
    //   if (!selectedPlace.includes(c.place)) {
    //     setPlaceList(
    //       selectedPlace.map((place, index) => (
    //         <SelectedPlace
    //           place={place.placeName}
    //           selected={selected}
    //           setPlaceList={setPlaceList}
    //         ></SelectedPlace>
    //       ))
    //     );
    //     selectedPlace.push(c.place);
    //   }
    //   console.log(selectedPlace);
    // });
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
      <Stack direction="row" onClick={addCourse}>
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
