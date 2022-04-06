import React, { useState, useEffect } from "react";
import { Grid, Modal, Rating } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
function Reivew(props) {
  return (
    <li style={{ margin: 10, textAlign: "center", my: 3 }}>
      <b style={{ marginRight: 20 }}>{props.user}</b> {props.content}
      <Rating
        style={{ marginLeft: 20 }}
        name="read-only"
        value={props.score}
        readOnly
      />
    </li>
  );
}
function PlaceInfo({ show, setShow, place }) {
  const [reviews, setReviews] = useState([]);

  return (
    <Modal
      open={show}
      onClose={setShow(!show)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid container sx={style} xs={12} spacing={3}>
        <Grid item xs={12}>
          <h2> {place.placeName} </h2>
        </Grid>
        <Grid item container>
          <Grid item>
            <img src={place.img} alt="" style={{ width: "400px" }}></img>
          </Grid>

          <Grid
            item
            style={{ textAlign: "center", marginLeft: 90 }}
            sx={{ justifyContent: "center", my: 3 }}
          >
            <h4>사용자 후기</h4>
            <ul style={{ listStyle: "none" }}>
              {place.reviews.map((r, i) => (
                <Reivew
                  style={{ textAlign: "center" }}
                  sx={{ justifyContent: "center", my: 3 }}
                  key={i}
                  user={r.userName}
                  content={r.content}
                  score={r.score}
                ></Reivew>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default PlaceInfo;
