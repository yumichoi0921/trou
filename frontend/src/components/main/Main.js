import * as React from "react";
import react, { useState, useEffect } from "react";
import styles from "./Main.css";
import backImg from "../../imgs/back.png";
import { Search } from "@mui/icons-material";
import {
  Grid,
  styled,
  Box,
  TextField,
  Stack,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import PlaceInfo from "./PlaceInfo";
import Item from "./child/Item";

const SearchDiv = styled(Box)({
  paddingTop: 80,
  paddingBottom: 100,
  backgroundImage: `url(${backImg})`,
});

export default function Main() {
  const [show, setShow] = useState(false);
  const [places, setPlaces] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const classes = styles;

  // const clickRecommand = async (e) => {
  //   console.log(e);
  //   setImgName(e.place_name);
  //   setSrc(e.img);
  //   await axios.get("/review/place/" + e.place_id).then((r) => {
  //     console.log(r.data);
  //     setReviews(r.data);
  //     // console.log(e.reviews);
  //     handleShow();
  //   });
  // };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchPlace(e.target.value);
    }
  };

  useEffect(() => {
    async function getRecommandPlace() {
      const userId = 1;
      try {
        const response = await axios.get("/place/recommand/" + userId);
        let array = await getPlaces(response);
        setPlaces(array);
      } catch (e) {
        console.log(e);
      }
    }
    getRecommandPlace();
  }, []);

  const searchPlace = async (e) => {
    let keyword = e;
    console.log(keyword);
    try {
      const response = await axios.get("/place/" + keyword);
      let array = await getPlaces(response);
      setPlaces(array);
    } catch (error) {}
  };

  const getPlaces = async (response) => {
    let array = [];
    let index = 0;
    console.log(response.data);
    array = response.data.map((place) => {
      if (place.img === " ") {
        index = Math.floor(Math.random() * (5 - 1) + 1);
        place.img = `/imgs/img${index}.jpg`;
      }
      return {
        placeId: place.place_id,
        placeName: place.place_name,
        img: place.img,
        mapX: place.mapx,
        mapY: place.mapy,
        tags: place.tags,
        readCount: place.read_count,
      };
    });
    return array;
  };

  const placeList = places.map((place, index) => (
    <Card
      sx={{ width: 300, marginX: "auto" }}
      onClick={() => {
        handleShow();
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={place.img}
          alt={place.placeName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {place.placeName}
          </Typography>
        </CardContent>
        {/* <PlaceInfo show={show} setShow={setShow} place={place}></PlaceInfo> */}
      </CardActionArea>
    </Card>
  ));
  return (
    <Grid
      container
      spacing={1}
      sx={{ height: "100%", justifyContent: "center" }}
    >
      <Grid constainer item xs={12}>
        <SearchDiv sx={{ justifyContent: "center", textAlign: "center" }}>
          <Stack spacing={2} alignItems="center">
            <Box>
              <h2>어디로 여행을 떠나시나요?</h2>
            </Box>
            <Box spacing={3} sx={{ alignItems: "center" }}>
              <Item>
                <Search
                  sx={{ color: "action.active", mr: 1, my: 1, fontSize: 40 }}
                />
                <TextField
                  id="input-with-sx"
                  label="도시 또는 태그 입력"
                  variant="standard"
                  color="primary"
                  // onKeyPress={(e) => handleKeyPress(e)}
                />
              </Item>
            </Box>
          </Stack>
        </SearchDiv>
      </Grid>
      <Grid constainer item xs={12}>
        <Box sx={{ margin: 3 }}>
          <h1>이 여행은 어떠신가요?</h1>
        </Box>
      </Grid>
      <Grid constainer item xs={12}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}
        >
          {placeList}
        </Box>
      </Grid>
    </Grid>
  );
}
