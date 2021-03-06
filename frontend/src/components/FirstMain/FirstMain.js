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
          <Button sx={{ width: 150 }}
            component={Link}
            to={"/login"}
            variant="contained"
            size="large"
            color="info"
          >
            μμνκΈ°
          </Button>
        </div>
      </div>
    </div>
  );
}
