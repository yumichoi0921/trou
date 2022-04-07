import * as React from "react";
import react, { useState, useEffect } from "react";
import backImg from "../../imgs/back.png";
import { Search } from "@mui/icons-material";
import title from "../img/Main_1.png";
import title_1 from "../img/Main_2.png";
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
  const [places, setPlaces] = useState([]);
  const [placeInfo, setPlaceInfo] = useState({});
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const placeInfoShow = (place) => {
    console.log(place);
    setPlaceInfo(place);
    handleShow();
  };

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
        let array = getPlaces(response);
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
      let array = getPlaces(response);
      setPlaces(array);
    } catch (error) {}
  };

  const getPlaces = (response) => {
    let array = [];
    let index = 0;
    console.log(response.data);
    array = response.data.map((place) => {
      if (!place.image) {
        index = Math.floor(Math.random() * (5 - 1) + 1);
        place.image = `/imgs/img${index}.jpg`;
      }
      return {
        placeId: place.placeId,
        placeName: place.placeName,
        image: place.image,
        mapX: place.mapX,
        mapY: place.mapY,
        tags: place.tags,
        readCount: place.readCount,
        reviews: place.reviews,
      };
    });
    return array;
  };

  const placeList = places.map((place, index) => (
    <Card
      sx={{ width: 350, marginX: "auto" }}
      onClick={() => placeInfoShow(place)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={place.image}
          alt={place.placeName}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {place.placeName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ));
  return (
    <Grid
      container
      spacing={1}
      sx={{ height: "100%", justifyContent: "center" }}
    >
      <Grid container item md={12}>
        <SearchDiv sx={{ textAlign: "center", width: "100%" }}>
          <Stack spacing={2} alignItems="center">
            <Box>
            <img src={title_1} alt="title"></img>
              {/* <h2>어디로 여행을 떠나시나요?</h2> */}
            </Box>
            <Box>
              <Item  sx={{ width: 500}}>
                <Search
                  sx={{ color: "action.active", mr: 1, my: 1, fontSize: 40 }}
                />
                <TextField
                  id="input-with-sx"
                  label="도시 또는 태그 입력"
                  variant="standard"
                  color="primary"
                  onKeyPress={(e) => handleKeyPress(e)}
                />
              </Item>
            </Box>
          </Stack>
        </SearchDiv>
      </Grid>
      <Grid container item md={12}>
        <Box sx={{ marginX: 5, marginY: 2, width: "100%" }}>
        <img src={title} alt="title"></img>
          {/* <h1>이 여행은 어떠신가요?</h1> */}
        </Box>
      </Grid>
      <Grid container item md={12}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            width: "100%",
          }}
        >
          {placeList}
        </Box>
        <Box>
          <PlaceInfo
            show={show}
            place={placeInfo}
            handleClose={handleClose}
          ></PlaceInfo>
        </Box>
      </Grid>
    </Grid>
  );
}
