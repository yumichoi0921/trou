import axios from "axios";
import { React, useEffect, useState } from "react";
import { Stack, Box, List, ListItem, ImageList, Grid } from "@mui/material";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import ShowCourse from "./ShowCourse";
import Item from "../child/Item";
import { Tab, TabPanel, TabsList } from "./Tab";
function RecommendCourse(props) {
  const [courses, setCourses] = useState([[]]);

  const findRecommandCourse = async () => {
    console.log(props.placeName);

    await axios
      .get("/order/placeId/" + props.placeName)
      .then((res) => {
        console.log("data:" + res.data);
        const tmp = [];
        res.data.map((p, index) => {
          tmp.push(p);
        });
        console.log("코스", tmp);
        setCourses(tmp);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    findRecommandCourse();
  }, []);

  return (
    <Grid
      container
      sx={{ width: "100%", height: "100%", justifyContent: "center" }}
    >
      <Grid Item sx={{ width: "100%", height: "15%" }}>
        <Item sx={{ width: "100%", borderRadius: 2 }}>
          비슷한 유저의 여행코스
        </Item>
      </Grid>
      <Grid Item sx={{ width: "100%", height: "85%", overflow: "auto" }}>
        {courses.map((course, index) => (
          <Item key={index} sx={{ width: "100%" }}>
            <ShowCourse
              key={index}
              selected={props.selected}
              course={course}
              setPlaceList={props.setPlaceList}
            ></ShowCourse>
          </Item>
        ))}
      </Grid>
    </Grid>
  );
}

export default RecommendCourse;
