import React, { useState, useEffect } from "react";
import { Grid, Modal, Rating, Typography, Box, ListItem } from "@mui/material";
import {
  Button,
  List,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 2,
};

function randoms() {
  return Math.floor(Math.random() * (5 - 1) + 1);
}
const Review = ({ review }) => {
  console.log(review);
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar>{review.name}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Rating
            style={{ marginLeft: 20 }}
            name="read-only"
            value={review.score}
            readOnly
          />
        }
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            ></Typography>
            {review.content}
          </React.Fragment>
        }
      />
      <Divider variant="inset" component="li" />
    </ListItem>
  );
};
function PlaceInfo({ show, handleClose, place }) {
  if (!place) return;
  console.log(place);

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid container sx={style} spacing={1}>
        <Grid container item md={12}>
          <Grid item md={6}>
            <h2> {place.placeName} </h2>
          </Grid>
          <Grid item md={6}>
            <h2>사용자 후기</h2>
          </Grid>
        </Grid>
        <Grid container item md={12} sx={{ height: "70%" }}>
          <Grid item md={6} sx={{ height: "100%" }}>
            {!place.image && (
              <img
                src={`/imgs/img${randoms()}.jpg`}
                alt=""
                style={{ width: "100%", height: "100%" }}
              ></img>
            )}
            {place.image && (
              <img
                src={place.image}
                alt=""
                style={{ width: "100%", height: "100%" }}
              ></img>
            )}
          </Grid>
          <Grid container item md={6} sx={{ height: "100%" }}>
            <Grid item sx={{ height: "100%", overflow: "scroll" }}>
              <List>
                {place.reviews &&
                  place.reviews.map((review) => (
                    <Review review={review}></Review>
                  ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item md={12} sx={{ justifyContent: "space-around" }}>
          <Button variant="outlined" onClick={handleClose}>
            닫기
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default PlaceInfo;
