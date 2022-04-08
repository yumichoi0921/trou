import {
  Grid,
  Stack,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import react, { useState, useEffect } from "react";
import Item from "../child/Item";
import SelectedPlace from "./SelectedPlace";
const ShowCourse = ({ selected, course, setPlaceList }) => {
  const [imgs, setImgs] = useState([]);
  const [count, setCount] = useState([]);

  function randoms() {
    return Math.floor(Math.random() * (11 - 1) + 1);
  }

  function addCourse() {
    if (course.length === 0) {
      course = [];
    }
    for (let c of course) {
      if (!selected.selectedPlace[selected.selectedDate])
        selected.selectedPlace[selected.selectedDate] = [];
      const selectedPlace = selected.selectedPlace[selected.selectedDate];
      if (!selectedPlace.includes(c.place)) {
        setPlaceList(
          selectedPlace.map((place, index) => (
            <SelectedPlace
              key={index}
              place={place.placeName}
              selected={selected}
              setPlaceList={setPlaceList}
            ></SelectedPlace>
          ))
        );
        selectedPlace.push(c.place);
      }
    }
  }

  return (
    <Stack
      direction="row"
      onClick={addCourse}
      sx={{ width: "100%", height: "100%", overflowX: "scroll" }}
      spacing={1}
    >
      {course.map((item, index) => (
        <Box key={index} sx={{ width: "50%", height: "100%" }}>
          <ImageListItem
            key={item.place.image}
            sx={{ width: "100%", height: "100%" }}
          >
            {item.place.image && (
              <img
                src={item.place.image}
                alt=" "
                style={{ width: "100px", height: "100px" }}
              ></img>
            )}
            {!item.place.image && (
              <img
                src={`/imgs/img${randoms()}.jpg`}
                alt=""
                style={{ width: "100px", height: "100px" }}
              ></img>
            )}
            <ImageListItemBar
              title={item.place.placeName}
              position="below"
              sx={{ width: "100%" }}
            />
          </ImageListItem>
        </Box>
      ))}
    </Stack>
  );
};

export default ShowCourse;
