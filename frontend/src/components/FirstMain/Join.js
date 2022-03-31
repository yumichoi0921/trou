import backgroundVideo from "../img/background.mp4";
import styles from "../FirstMain/FirstMain.module.css";
import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, TextField, Stack } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

export default function FirstMain() {
  const emailList = [
    { label: "@naver.com", year: 1994 },
    { label: "@hanmail.net", year: 1972 },
    { label: "@gamil.com", year: 1974 },
    { label: "@ssafy.com", year: 2008 },
  ];
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
              <p class={styles.input_title}>Email</p>
              <Stack spacing={9} direction="row">
                <TextField
                  className={styles.input_text}
                  required
                  id="outlined-required"
                  label="이메일을 입력하세요"
                  type="text"
                  name="userLoginId"
                  sx={{ width: 300 }}
                />

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={emailList}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="email 선택" />
                  )}
                />

                <Button variant="contained" sx={{ width: 100 }}>
                  중복확인
                </Button>
              </Stack>
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
