import styles from "./Main.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Container } from "react-bootstrap";
export default function Main() {
  return (
    <div>
      <Row className="mx-0">
        <Button as={Col} variant="primary">
          Button #1
        </Button>
        <Button as={Col} variant="secondary" className="mx-2">
          Button #2
        </Button>
        <Button as={Col} variant="success">
          Button #3
        </Button>
      </Row>
      <Container>
        <Row>
          <Col>어디로 떠나시나요</Col>
        </Row>
        <Row></Row>
        <Row></Row>
      </Container>
      <div className={styles.searchDiv}>
        <h2>어디로 떠나시나요?</h2>
        <input className={styles.searchBar} type="text" />
      </div>
      <div>
        <h3>이 여행은 어떠신가요??</h3>
        <div></div>
      </div>
    </div>
  );
}
