import React, { Fragment, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { styled, Grid, Box, Button, Stack, Collapse } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import Place from "./Place";
import KakaoMap from "./KakaoMap";
const Area = styled(Box)({
  height: 600,
  backgroundColor: "#90caf9",
  padding: 25,
  "&:hover": {
    backgroundColor: "#64b5f6",
    opacity: [0.9, 0.8, 0.7],
  },
});

const Route = ({ index, route, routes, orderSetter }) => {
  const [places, setPlaces] = useState(route["routePlaces"]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const newRoutes = [...routes];
    newRoutes[index]["routePlaces"] = places;
    orderSetter(newRoutes);
  }, [places]);

  const handleChange = () => {
    setOpen((prev) => !prev);
  };
  const movePlace = useCallback(
    (dragIndex, hoverIndex) => {
      const newCards = [...places];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, places[dragIndex]);
      setPlaces(newCards);
    },
    [places]
  );

  const placeList = places.map((item, index) => (
    <Place
      index={index}
      id={item.placeId}
      name={item.placeName}
      movePlace={movePlace}
      key={item.placeId}
    />
  ));

  return (
    <Fragment>
      <div>
        <span>
          {route["day"]}일차: {route["date"]}
        </span>
        <span>
          {open ? (
            <ExpandLess onClick={handleChange} />
          ) : (
            <ExpandMore onClick={handleChange} />
          )}
        </span>
      </div>
      <Collapse in={open}>{placeList}</Collapse>
    </Fragment>
  );
};

const Check = () => {
  const startDate = "2022-01-01";
  const endDate = "2022-01-02";

  const routeArray = [
    {
      routeId: -1,
      routeDate: "2022-03-01",
      day: 1,
      routePlaces: [
        { placeId: 128345, placeName: "여행지1" },
        { placeId: 125405, placeName: "여행지2" },
        { placeId: 125406, placeName: "여행지3" },
        { placeId: 125407, placeName: "여행지4" },
      ],
    },
    {
      routeId: -1,
      routeDate: "2022-03-02",
      day: 2,
      routePlaces: [
        { placeId: 128345, placeName: "여행지1" },
        { placeId: 125405, placeName: "여행지2" },
        { placeId: 125406, placeName: "여행지3" },
        { placeId: 125407, placeName: "여행지4" },
      ],
    },
  ];
  const [routes, setRoutes] = useState(routeArray);
  const routeList = routes.map((item, index) => (
    <Route index={index} route={item} routes={routes} orderSetter={setRoutes} />
  ));

  const save = async () => {
    // const url = "http://localhost:8080";
    const userId = 1;
    var data = {};
    try {
      data = { startDate: startDate, endDate: endDate };
      const plan = await axios.post("/plan/" + userId, data);
      const planId = plan.data.planId;

      for (const item of routes) {
        data = { routeDate: item.routeDate, day: item.day };
        const route = await axios.post("/route/" + planId, data);
        item.routeId = route.data.routeId;
      }

      for (const item of routes) {
        const orderList = [];
        for (let [index, place] of Object.entries(item.routePlaces)) {
          data = { tripOrder: Number(index) + 1, placeId: place.placeId };
          orderList.push(data);
        }
        await axios.post("/order/" + item.routeId, orderList);
      }
      alert("저장되었습니다.");
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item md={3} sx={{ textAlign: "center" }}>
          <Area sx={{ overflow: "auto" }}>
            <Stack spacing={2}>
              {routeList}
              <Stack
                spacing={2}
                direction="row"
                sx={{ justifyContent: "center", my: 3 }}
              >
                <Button variant="contained" color="warning">
                  더 담으러 가기
                </Button>
                <Button variant="contained" onClick={save}>
                  다음으로
                </Button>
              </Stack>
            </Stack>
          </Area>
        </Grid>
        <Grid item md={9}>
          <Area>
            <KakaoMap></KakaoMap>
          </Area>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Check;
