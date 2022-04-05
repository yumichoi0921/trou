import backgroundVideo from "../img/background.mp4";

import styles from "../FirstMain/FirstMain.module.css";
import { Card } from "@mui/material";

export default function SelectPlace() {
  return (
    <div className={styles.backgound}>
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>

          <div className={styles.login}>
          <Card>
          여기에 태그들 넣은 곳
        </Card>
        </div>
    </div>
  );
}
