/* global kakao */
import React, { Fragment, useEffect, useState, useCallback } from "react";
import { styled, Grid, Box, Button, Stack, Collapse } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import Place from "./Place";
const Area = styled(Box)({
  minHeight: 600,
  backgroundColor: "#90caf9",
  padding: 25,
  "&:hover": {
    backgroundColor: "#64b5f6",
    opacity: [0.9, 0.8, 0.7],
  },
});

const Route = ({ route }) => {
  const [date, setDate] = useState(route["routeDate"]);
  const [places, setPlaces] = useState(route["routePlaces"]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    console.log("useEffect!!", places);
  });

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
        <span>{date}</span>
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

const Check = () => {
  const routeArray = [
    {
      routeDate: "2022-03-01",
      routePlaces: [
        { placeId: 1, placeName: "여행지1" },
        { placeId: 2, placeName: "여행지2" },
        { placeId: 3, placeName: "여행지3" },
        { placeId: 4, placeName: "여행지4" },
      ],
    },
    {
      routeDate: "2022-03-02",
      routePlaces: [
        { placeId: 1, placeName: "여행지1" },
        { placeId: 2, placeName: "여행지2" },
        { placeId: 3, placeName: "여행지3" },
        { placeId: 4, placeName: "여행지4" },
      ],
    },
  ];
  const [routes, setRoutes] = useState(routeArray);
  const routeList = routes.map((item, index) => (
    <Route day={index} route={item} setRouteOrder={setRoutes} />
  ));

  function saveOrder() {}

  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item md={3} sx={{ textAlign: "center" }}>
          <Area>
            <Stack spacing={2}>
              {routeList}
              <Stack
                spacing={2}
                direction="row"
                sx={{ justifyContent: "center", my: 3 }}
              >
                <Button variant="outlined">더 담으러 가기</Button>
                <Button variant="contained" onClick={saveOrder}>
                  다음으로
                </Button>
              </Stack>
            </Stack>
          </Area>
        </Grid>
        <Grid item md={9}>
          <Area>
            <KakaoMap></KakaoMap>
            <Stack
              spacing={2}
              direction="row"
              sx={{ justifyContent: "center", my: 3 }}
            >
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
            </Stack>
          </Area>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Check;
