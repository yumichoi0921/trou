import * as React from "react";
import ReactDOM from "react-dom";
import react, { useState, useEffect } from "react";
import backImg from "../../imgs/back.png";
import { LineAxisOutlined, PlayCircleSharp, Search } from "@mui/icons-material";
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const classes = styles;
  function clickSite(e) {
    e.preventDefault();
    console.log(e.target);
    // console.log(e.target.image.src);
    // console.log(e.target.image.name);
    //  console.log(e.target.placeName);

    setImgName(e.target.name);
    setSrc(e.target.src);
    handleShow();
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
        // console.log(place.image);
        if (place.image == null) {
          place.image = backImg;
        }
        return (
          <div
            style={{ float: "left", marginLeft: 20, height: 400, width: 400 }}
            key={i}
            onClick={clickSite}
          >
            <h2> {place.placeName}</h2>

            <img
              src={place.image}
              alt={i}
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
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
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
