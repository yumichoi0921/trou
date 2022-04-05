import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Collapse } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import Place from "./Place";
const Route = ({ index, route, routes, setRoutes }) => {
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = useState(route.order);

  const handleChange = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const newRoute = { ...route };
    newRoute.order = order;
    const newRoutes = [...routes];
    newRoutes[index] = newRoute;
    setRoutes(newRoutes);
  }, [order]);

  const movePlace = useCallback((dragIndex, hoverIndex) => {
    const newOrder = [...route.order];
    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, route.order[dragIndex]);
    setOrder(newOrder);
  });

  let placeList = route.order.map((place, index) => (
    <Place
      index={index}
      id={place.placeId}
      name={place.placeName}
      movePlace={movePlace}
      key={place.placeId}
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
