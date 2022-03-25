import styles from "./Main.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Modal, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
export default function Main() {
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState("");
  const [imgName, setImgName] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function clickSite(e) {
    e.preventDefault();
    console.log(e.target.src);
    console.log(e.target.name);
    setImgName(e.target.name);
    setSrc(e.target.src);
    handleShow();
  }

  return (
    <Container fluid>
      <div className={styles.searchDiv}>
        <Row>
          <Row>
            <Col md={5}></Col>
            <Col>
              <h3>어디로 여행을 떠나시나요?</h3>
            </Col>
            <Col></Col>
          </Row>

          <Row>
            <Col md={4}></Col>
            <Col>
              <FaSearch />
              <input
                placeholder="도시 또는 태그 입력"
                className={styles.searchBar}
                type="text"
              />
            </Col>
            <Col></Col>
          </Row>
        </Row>
      </div>

      <Row>
        <Row>
          <div style={{ marginTop: "50px", marginLeft: "100px" }}>
            <h3>이 여행은 어떠신가요??</h3>
          </div>
        </Row>
        <Row>
          <div
            style={{
              marginTop: "50px",
              marginLeft: "100px",
              marginRight: "100px",
              float: "right",
            }}
          >
            <div style={{ float: "left" }}>
              <h2> 한라산</h2>
              <img
                onClick={clickSite}
                src="https://mdbootstrap.com/img/new/standard/city/041.webp"
                alt="..."
                name="한라산"
                style={{ maxWidth: "20rem", margin: "1rem" }}
              />
            </div>
            <div style={{ float: "left" }}>
              <h2> 한라산</h2>
              <img
                src="https://mdbootstrap.com/img/new/standard/city/041.webp"
                alt="..."
                style={{ maxWidth: "20rem", margin: "1rem" }}
              />
            </div>
            <div style={{ float: "left" }}>
              <h2> 한라산</h2>
              <img
                src="https://mdbootstrap.com/img/new/standard/city/041.webp"
                alt="..."
                style={{ maxWidth: "20rem", margin: "1rem" }}
              />
            </div>
          </div>
        </Row>
      </Row>
      <Modal size="xl" show={show} onHide={handleClose}>
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
      </Modal>
    </Container>
  );
}
