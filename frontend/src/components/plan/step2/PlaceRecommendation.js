import * as React from "react";
import { styled } from "@mui/system";
import { Stack, Box } from "@mui/material";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import RestaurantSearch from "./RestaurantSearch";
import PlaceSearch from "./PlaceSearch";
import RecommendedPlace from "./RecommendedPlace";
import Item from "../child/Item";
import RecommendedRestaurant from "./RecommendedRestaurant";
import axios from "axios";
import TagRelatedPlace from "./TagRelatedPlace";
import { Tab, TabPanel, TabsList } from "./Tab";

export default function PlaceRecommendation(props) {
  const [restaurants, setRestaurants] = React.useState([]);
  const [places, setPlaces] = React.useState([]);
  const [relatedPlaces, setRelatedPlaces] = React.useState([]);

  console.log(props);

  React.useEffect(() => {
    const tags = props.selected.selectedTags.map((t, index) => t.tagName);
    console.log(tags);
    async function getRelatedPlace() {
      const res = await axios.post(
        "http://localhost:8080/place/related/tag",
        props.selected.selectedTags
      );
      console.log(res.data);
      setRelatedPlaces(res.data);
    }
    getRelatedPlace();
  }, [props.selected.selectedTags]);

  const relatedPlaceList = relatedPlaces.map((place, index) => (
    <TagRelatedPlace
      key={index}
      place={place}
      selected={props.selected}
      placeList={props.placeList}
      setPlaceList={props.setPlaceList}
      variant="contained"
      sx={{ margin: "auto" }}
    >
      {place.placeName}
    </TagRelatedPlace>
  ));

  const placeList = places.map((place, index) => (
    <RecommendedPlace
      key={index}
      place={place}
      selected={props.selected}
      placeList={props.placeList}
      setPlaceList={props.setPlaceList}
      variant="contained"
      sx={{ margin: "auto" }}
    >
      {place.placeName}
    </RecommendedPlace>
  ));

  const restaurantList = restaurants.map((place, index) => (
    <RecommendedRestaurant
      key={index}
      place={place}
      selected={props.selected}
      placeList={props.placeList}
      setPlaceList={props.setPlaceList}
      variant="contained"
      sx={{ overflow: "auto" }}
    >
      {place.placeName}
    </RecommendedRestaurant>
  ));

  return (
    <Stack sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <TabsUnstyled defaultValue={0}>
        <TabsList>
          <Tab>추천 장소</Tab>
          <Tab>장소 검색</Tab>
          <Tab>맛집 검색</Tab>
        </TabsList>

        <TabPanel value={0} sx={{ width: "100%", height: "50%" }}>
          <Item sx={{ height: "100%", overflow: "auto" }}>
            {relatedPlaceList.length === 0 ? null : (
              <Box mb={2}>{relatedPlaceList}</Box>
            )}
          </Item>
        </TabPanel>
        <TabPanel value={1} sx={{ width: "100%", height: "50%" }}>
          <Box>
            <PlaceSearch setPlaces={setPlaces}></PlaceSearch>
          </Box>
          <Item sx={{ height: "90%", overflow: "auto", mt: 1 }}>
            {placeList.length === 0 ? null : <Box>{placeList}</Box>}
          </Item>
        </TabPanel>
        <TabPanel value={2} sx={{ width: "100%", height: "50%" }}>
          <Box>
            <RestaurantSearch
              restaurants={restaurants}
              setRestaurants={setRestaurants}
            ></RestaurantSearch>
          </Box>
          <Item sx={{ height: "90%", overflow: "auto", mt: 1 }}>
            {restaurantList.length === 0 ? null : (
              <Box sx={{ overflow: "auto", width: "100%" }} mt={2}>
                {restaurantList}
              </Box>
            )}
          </Item>
        </TabPanel>
      </TabsUnstyled>

      {/* <Item mt={3}>비슷한 유저의 여행 코스</Item>
      <Item mt={3}>A - B - C</Item> */}
    </Stack>
  );
}
