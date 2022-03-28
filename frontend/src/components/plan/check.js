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

const Route = () => {
  const [places, setPlaces] = useState([
    { id: 1, name: "여행지1" },
    { id: 2, name: "여행지2" },
    { id: 3, name: "여행지3" },
    { id: 4, name: "여행지4" },
  ]);
  const [open, setOpen] = React.useState(false);

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
      id={item.id}
      name={item.name}
      movePlace={movePlace}
      key={item.id}
    />
  ));

  return (
    <Fragment>
      <div>
        <span>날짜</span>
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
  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item md={3} sx={{ textAlign: "center" }}>
          <Area>
            <Stack spacing={2}>
              <Route />
              <Route />
              <Stack
                spacing={2}
                direction="row"
                sx={{ justifyContent: "center", my: 3 }}
              >
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
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
