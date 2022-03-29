import backgroundVideo from "../img/background.mp4";
import title from "../img/title.png";
import styles from "../FirstMain/FirstMain.module.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function FirstMain() {
  return (
    <div className={styles.backgound}>
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className={styles.log}>
        <img src={title} alt="title"></img>
        <div className={styles.button}>
          <Button
            component={Link}
            to={"/login"}
            variant="contained"
            size="large"
          >
            시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}
