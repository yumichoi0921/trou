import axios from "axios";
import { React, useEffect, useState } from "react";
import { Stack, Box, List, ListItem } from "@mui/material";
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
          console.log(p);
        });
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
    <Stack sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <TabsUnstyled defaultValue={0}>
        <TabsList>
          <Tab>비슷한 유저의 여행코스</Tab>
        </TabsList>

        <TabPanel value={0} sx={{ width: "100%", height: "50%" }}>
          <List
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "#e1f5fe",
              position: "relative",
              overflow: "scroll",
            }}
          >
            {courses.map((course, index) => (
              <ListItem
                key={index}
                sx={{ width: "100%", height: "50%", overflowX: "auto" }}
              >
                <ShowCourse key={index} course={course}></ShowCourse>
              </ListItem>
            ))}
          </List>
          );
          {/* <Item sx={{ width: "100%", height: "100%", overflow: "auto" }}>
            {courese.map((course, index) => (
              <ShowCourse key={index} course={course}></ShowCourse>
            ))}
          </Item> */}
        </TabPanel>
      </TabsUnstyled>
    </Stack>
  );
}

export default RecommendCourse;
