import backgroundVideo from "../img/background.mp4";
import styles from "../FirstMain/FirstMain.module.css";
import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, TextField } from "@mui/material";

export default function FirstMain() {
  return (
    <div className={styles.backgound}>
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className={styles.login}>
        <Card>
          <p className={styles.logi_title}>Join</p>
          <CardContent>
            {/* <Typography variant="body1" component="p">
              Please enter something. <br />
            </Typography> */}
            <form>
              <p class={styles.input_title}>ID</p>
              <TextField
                className={styles.input_text}
                required
                id="outlined-required"
                label="아이디를 입력하세요(5~12자)"
                type="text"
                name="userLoginId"
              />
              <p class={styles.input_title}>Name</p>
              <TextField
                className={styles.input_text}
                required
                id="outlined-required"
                label="이름을 입력하세요"
                type="text"
                name="userNameId"
              />
              <p class={styles.input_title}>PW</p>
              <TextField
                className={styles.input_text}
                id="outlined-password-input"
                label="비밀번호를 입력하세요(6~15자)"
                type="password"
                autoComplete="current-password"
              />

              <div className={styles.Join_form_btn}>
                <Button
                  className={styles.Join_btn}
                  variant="contained"
                  size="large"
                >
                  가입하기
                </Button>
                <Button
                  className={styles.Back_btn}
                  component={Link}
                  to={"/login"}
                  variant="contained"
                  size="large"
                >
                  뒤로가기
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
