import * as React from "react";
import ReactDOM from "react-dom";
import react, { useState, useEffect } from "react";
import backImg from "../../imgs/back.png";
import { LineAxisOutlined, PlayCircleSharp, Search } from "@mui/icons-material";
import styles from "./Main.css";

import axios from "axios";
//import  Button  from "@mui/material/Button";
import { Grid, styled, Box, TextField } from "@mui/material";
export default function Main() {
  const [show, setShow] = useState(false);
  // const [src, setSrc] = useState("");
  const [places, setPlaces] = useState("");
  // const [imgName, setImgName] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const classes = styles;
  // function clickSite(e) {
  //   e.preventDefault();
  //   console.log(e.target.src);
  //   console.log(e.target.name);
  //   setImgName(e.target.name);
  //   setSrc(e.target.src);
  //   handleShow();
  // }

  // e.preventDefault();

  const SearchPlace = async (e) => {
    try {
      let keyword = e;
      console.log(keyword);
      const response = await axios({
        method: "get",
        url: `/place?${keyword}`,
        baseURL: "http://localhost:8080",
        timeout: 2000,
      });
      console.log(response.data);
      let array = [];
      array = response.data.map((place, i) => {
        return (
          <div style={{ float: "left" }} key={i}>
            <h2> {place.placeName}</h2>

            <img
              // onClick={clickSite}
              src={place.image}
              alt={i}
              name={place.placeName}
              style={{ maxWidth: "20rem", margin: "1rem" }}
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
    width: 1500,
  });
  return (
    <Grid container>
      <SearchDiv>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Grid sx={{ justifyContent: "center", my: 3 }}>
            <Box style={{ textAlign: "center" }}>
              {" "}
              <h2>어디로 여행을 떠나시나요?</h2>{" "}
            </Box>
          </Grid>
          <Grid item></Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={8}>
            <Search
              sx={{
                color: "action.active",
                fontSize: 40,
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
              onChange={(e) => SearchPlace(e.target.value)}
            />
          </Grid>
        </Grid>
      </SearchDiv>
      <Grid item xs={12}>
        <Grid item xs={4}>
          <div style={{ marginTop: "50px" }}>
            <h1>이 여행은 어떠신가요??</h1>
          </div>
        </Grid>
      </Grid>

      <Grid>{places}</Grid>
    </Grid>
    /* <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you're reading this text in a modal!
          <Row>
            <h2>{imgName}</h2>
            <Col>
              {" "}
              <img src={src} alt="" style={{ width: "500px" }}></img>
            </Col>
            <Col>
              {" "}
              <div style={{ width: "500px" }}>
                <Row>
                  <h3>한라산 리뷰</h3>
                </Row>
                <Row> 여기 정말 좋아요!</Row>
                <Row>
                  {" "}
                  #바다 #힐링 #액티비티 #아이들과 아이들이 너무 좋아했어요~
                  다음에 또 방문 예정입니다
                </Row>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */
  );
}
