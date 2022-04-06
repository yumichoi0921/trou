import axios from "axios";
import { React, useEffect, useState } from "react";
import ShowCourse from "./ShowCourse";
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
    <div>
      {courses.map((course, index) => (
        <ShowCourse
          key={index}
          selected={props.selected}
          course={course}
          setPlaceList={props.setPlaceList}
        ></ShowCourse>
      ))}
    </div>
  );
}

export default RecommendCourse;
