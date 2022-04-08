import React, { Link } from "react";
import { useNavigate } from "react-router-dom";
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

const Review = ({ review }) => {
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
  const navigate = useNavigate();
  if (!place) return;
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
            <img
              src={place.image}
              alt=""
              style={{ width: "100%", height: "100%" }}
            ></img>
          </Grid>
          <Grid container item md={6} sx={{ height: "100%" }}>
            <Grid item sx={{ height: "100%", overflow: "scroll" }}>
              <List>
                {place.reviews &&
                  place.reviews.map((review, i) => (
                    <Review review={review} key={i}></Review>
                  ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item md={12} sx={{ justifyContent: "space-around" }}>
          <Button
            variant="contained"
            onClick={() =>
              navigate("/plan", { state: { startingPoint: place } })
            }
          >
            일정담기
            {/* <Link to="/plan" startingPoint={{place}}>일정담기</Link> */}
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            닫기
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default PlaceInfo;
