import * as React from "react";
import ReactDOM from "react-dom";
import react, { useState, useEffect } from "react";
import backImg from "../../imgs/back.png";
import {
  CommitSharp,
  LineAxisOutlined,
  PlayCircleSharp,
  Search,
} from "@mui/icons-material";
import styles from "./Main.css";

import axios from "axios";
//import  Button  from "@mui/material/Button";
import { Grid, styled, Box, TextField, Modal, Typography } from "@mui/material";
import { height } from "@mui/system";
export default function Main() {
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState("");
  const [places, setPlaces] = useState("");
  const [imgName, setImgName] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const classes = styles;
  function clickSite(e) {
    //e.preventDefault();
    console.log(e);
    setImgName(e.placeName);
    setSrc(e.placeImage);
    console.log(e.reviews);
    setReviews(e.reviews);

    handleShow();
  }

  function Reivew(props) {
    return (
      <Box>
        <h1>{props.user}</h1> <p>{props.content}</p>
      </Box>
    );
  }
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      SearchPlace(e.target.value);
    }
  };

  const SearchPlace = async (e) => {
    try {
      let keyword = e;
      console.log(keyword);
      const response = await axios({
        method: "get",
        url: `/place/${keyword}`,
        baseURL: "http://localhost:8080",
        timeout: 2000,
      });
      console.log(response.data);
      let array = [];
      array = response.data.map((place, i) => {
        console.log(place);
        if (place.image == null) {
          place.image = backImg;
        }
        return (
          <div
            style={{ float: "left", marginLeft: 20, height: 400, width: 400 }}
            key={i}
          >
            <h2> {place.placeName}</h2>

            <img
              onClick={() => {
                clickSite(place);
              }}
              src={place.image}
              alt={place.placeId}
              name={place.placeName}
              style={{
                height: "300px",
                width: "400px",
              }}
            />
          </div>
        );
      });
      setPlaces(array);
    } catch (err) {
      console.log(err);
    }
  };
  const SearchDiv = styled(Grid)({
    marginTop: 50,
    paddingTop: 50,
    marginLeft: 100,
    marginRight: 100,
    paddingBottom: 80,
    backgroundImage: `url(${backImg})`,
    // width: "100%",
  });

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
  return (
    <Grid container>
      <Grid item xs={12}>
        <SearchDiv sx={{ justifyContent: "center", my: 3 }}>
          <Box style={{ textAlign: "center", marginBottom: 20 }}>
            <h2>어디로 여행을 떠나시나요?</h2>
          </Box>
          <Box style={{ textAlign: "center", marginTop: 10 }} sx={{ mt: 10 }}>
            <Search
              sx={{
                color: "action.active",
                fontSize: 40,
                justifyContent: "center",
                my: 3,
              }}
            />
            <TextField
              style={{ backgroundColor: "white", marginLeft: 10 }}
              color="secondary"
              size="small"
              type="search"
              variant="filled"
              id="outlined-required"
              label="도시 또는 태그 입력"
              onKeyPress={(e) => handleKeyPress(e)}

              // onChange={(e) => SearchPlace(e.target.value)}
            />
          </Box>
        </SearchDiv>
      </Grid>
      <Grid>
        <Box style={{ marginLeft: 100 }}>
          <div style={{ marginTop: 50, marginBottom: 20 }}>
            <h1>이 여행은 어떠신가요??</h1>
          </div>
        </Box>
      </Grid>

      <Box style={{ marginLeft: 200 }}>{places}</Box>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {imgName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <img src={src} alt="" style={{ width: "500px" }}></img>

            {reviews.map((r, i) => (
              <Reivew key={i} user={r.userName} content={r.content}></Reivew>
            ))}
          </Typography>
        </Box>
      </Modal>
    </Grid>
  );
}
