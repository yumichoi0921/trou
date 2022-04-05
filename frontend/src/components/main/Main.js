import * as React from "react";
import ReactDOM from "react-dom";
import react, { useState, useEffect } from "react";
import backImg from "../../imgs/back.png";

import parse from "html-react-parser";
import {
  CommitSharp,
  LineAxisOutlined,
  PlayCircleSharp,
  Search,
  Star,
} from "@mui/icons-material";
import styles from "./Main.css";

import axios from "axios";
//import  Button  from "@mui/material/Button";
import {
  Grid,
  styled,
  Box,
  TextField,
  Modal,
  Typography,
  Rating,
} from "@mui/material";
import { height } from "@mui/system";
export default function Main() {
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState("");
  const [places, setPlaces] = useState("");
  const [imgName, setImgName] = useState("");
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const classes = styles;
  function clickSite(e) {
    console.log(e);
    //e.preventDefault();
    setImgName(e.placeName);
    setSrc(e.image);
    setReviews(e.reviews);
    handleShow();
  }
  const clickRecommand = async (e) => {
    console.log(e);
    setImgName(e.place_name);
    setSrc(e.img);
    await axios.get("/review/place/" + e.place_id).then((r) => {
      console.log(r.data);
      setReviews(r.data);
      // console.log(e.reviews);
      handleShow();
    });
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
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      SearchPlace(e.target.value);
    }
  };

  const SearchPlace = async (e) => {
    let keyword = e;
    console.log(keyword);
    let array = [];
    let index = 0;
    const response = await axios.get("/place/" + keyword).then((r) => {
      array = r.data.map((place, i) => {
        console.log(place);
        place.isImg = true;
        if (place.image === null) {
          index = Math.floor(Math.random() * (5 - 1) + 1);
          console.log(index);
          place.image = `/imgs/img${index}.jpg`;
          place.index = index;
          place.isImg = false;
        } else {
          console.log(place.img);

          place.isImg = true;
        }
        return (
          <div
            style={{ float: "left", marginLeft: 20, height: 300, width: 300 }}
            key={i}
          >
            <h3> {place.placeName}</h3>
            {place.isImg && (
              <img
                onClick={() => {
                  clickSite(place);
                }}
                src={place.image}
                alt={place.placeId}
                name={place.placeName}
                style={{
                  height: "200px",
                  width: "300px",
                }}
              />
            )}
            {!place.isImg && (
              <img
                onClick={() => {
                  clickSite(place);
                }}
                src={`/imgs/img${place.index}.jpg`}
                alt={place.placeId}
                name={place.placeName}
                style={{
                  height: "200px",
                  width: "300px",
                }}
              />
            )}
          </div>
        );
      });
      setPlaces(array);
    });
  };

  useEffect(() => {
    setUserId(1);
    const userId = 1;

    const response = axios
      .get("/place/recommand/" + userId)
      .then((r) => {
        console.log(r.data);
        let array = [];
        let index = 0;
        array = r.data.map((place, i) => {
          place.isImg = true;
          if (place.img === " ") {
            index = Math.floor(Math.random() * (5 - 1) + 1);
            console.log(index);
            place.img = index;
            place.isImg = false;
            place.index = index;
            place.img = `/imgs/img${index}.jpg`;
          } else {
            console.log(place.img);

            place.isImg = true;
          }
          console.log(place.isImg);
          return (
            <div
              style={{ float: "left", marginLeft: 20, height: 300, width: 300 }}
              key={i}
            >
              <h3> {place.place_name}</h3>
              {place.isImg}
              {place.isImg && (
                <img
                  onClick={() => {
                    clickRecommand(place);
                  }}
                  src={place.img}
                  alt={place.place_id}
                  name={place.place_name}
                  style={{
                    height: "200px",
                    width: "300px",
                  }}
                /> /* {/*  */ //}
              )}
              {!place.isImg && (
                <img
                  onClick={() => {
                    clickRecommand(place);
                  }}
                  src={`/imgs/img${place.index}.jpg`}
                  alt={place.place_id}
                  name={place.place_name}
                  style={{
                    height: "200px",
                    width: "300px",
                  }}
                /> /* {/*  */ //}
              )}
              {/* /* : (
                <img
                  onClick={() => {
                    clickRecommand(place);
                  }}
                  src={require(`../../imgs/${index}.jpg`)}
                  alt={place.place_id}
                  name={place.place_name}
                  style={{
                    height: "200px",
                    width: "300px",
                  }}
                />
              )} */}{" "}
            </div>
          );
        });
        setPlaces(array);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const SearchDiv = styled(Grid)({
    marginTop: 50,
    paddingTop: 50,
    // marginLeft: 100,
    // marginRight: 100,
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

      <Box style={{ marginLeft: "15%" }}>{places}</Box>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          container
          sx={style}
          xs={12}
          // style={{ float: "left" }}
          spacing={3}
        >
          <Grid item xs={12}>
            <h2> {imgName} </h2>
          </Grid>
          <Grid item container>
            <Grid item>
              <img src={src} alt="" style={{ width: "400px" }}></img>
            </Grid>

            <Grid
              item
              style={{ textAlign: "center", marginLeft: 90 }}
              sx={{ justifyContent: "center", my: 3 }}
            >
              {" "}
              <h4>사용자 후기</h4>
              <ul style={{ listStyle: "none" }}>
                {reviews.map((r, i) => (
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
    </Grid>
  );
}
