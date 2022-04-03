import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Collapse } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import Place from "./Place";
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
          {route["day"]}일차: {route["routeDate"]}
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
export default Route;
