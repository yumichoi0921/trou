import * as React from "react";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import RestaurantSearch from "./RestaurantSearch";
import PlaceSearch from "./PlaceSearch";
import RecommendedPlace from "./RecommendedPlace";
import Item from "../child/Item";
import RecommendedRestaurant from "./RecommendedRestaurant";
import axios from "axios";
import TagRelatedPlace from "./TagRelatedPlace";

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: #e1f5fe;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #d3d3d3;
    color: #000000;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: #e1f5fe;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

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
      sx={{ m: 1 }}
    >
      {place.name}
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
      sx={{ m: 1 }}
    >
      {place.name}
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
      sx={{ m: 1 }}
    >
      {place.name}
    </RecommendedRestaurant>
  ));

  return (
    <React.Fragment>
      {relatedPlaceList.length === 0 ? null : (
        <React.Fragment>
          <Item mb={2}>추천 장소</Item>
          <Item mb={2}>{relatedPlaceList}</Item>
        </React.Fragment>
      )}
      <TabsUnstyled defaultValue={0}>
        <TabsList>
          <Tab>장소 검색</Tab>
          <Tab>맛집 검색</Tab>
        </TabsList>

        <TabPanel value={0}>
          <PlaceSearch places={places} setPlaces={setPlaces}></PlaceSearch>
          {placeList.length === 0 ? null : (
            <Item sx={{ overflow: "auto" }} mt={2}>
              {placeList}
            </Item>
          )}
        </TabPanel>
        <TabPanel value={1}>
          <RestaurantSearch
            restaurants={restaurants}
            setRestaurants={setRestaurants}
          ></RestaurantSearch>
          {restaurantList.length === 0 ? null : (
            <Item sx={{ overflow: "auto" }} mt={2}>
              {restaurantList}
            </Item>
          )}
        </TabPanel>
      </TabsUnstyled>
      <Item mt={3}>비슷한 유저의 여행 코스</Item>
      <Item mt={3}>A - B - C</Item>
    </React.Fragment>
  );
}
