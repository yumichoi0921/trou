import backgroundVideo from "../img/background.mp4";
import styles from "../FirstMain/FirstMain.module.css";
import * as React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Stack,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
export default function FirstMain() {
  const emailList = [
    { label: "@naver.com" },
    { label: "@hanmail.net" },
    { label: "@gamil.com" },
    { label: "@ssafy.com" },
  ];

  // const [userEmail, setUserEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  // 이메일 중복 확인
  const checkUserEmail = () => {
    const UserEmail = email1 + email2;

    console.log(UserEmail);
    axios.get("/users/" + UserEmail).then((res) => {
      console.log(res);
    });
  };

  // const onChangeEmail = (e) => {
  //   setEmail1(e.target.value);
  // };
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
              <p className={styles.input_title}>Email</p>
              <Stack spacing={9} direction="row">
                <TextField
                  className={styles.input_text}
                  required
                  id="outlined-required"
                  label="이메일을 입력하세요"
                  type="text"
                  onChange={(e) => setEmail1(e.target.value)}
                  name="userLoginId"
                  sx={{ width: 300 }}
                  value={email1}
                />

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={emailList}
                  sx={{ width: 300 }}
                  onChange={(event, option) => setEmail2(option.label)}
                  renderInput={(params) => (
                    <TextField {...params} label="email 선택" />
                  )}
                  value={email2}
                />

                <Button
                  variant="contained"
                  sx={{ width: 100 }}
                  onClick={checkUserEmail}
                >
                  중복확인
                </Button>
              </Stack>
              <p className={styles.input_title}>Name</p>
              <TextField
                className={styles.input_text}
                required
                id="outlined-required"
                label="이름을 입력하세요"
                type="text"
                name="userNameId"
              />
              <p className={styles.input_title}>PW</p>
              <TextField
                className={styles.input_text}
                id="outlined-password-input"
                label="비밀번호를 입력하세요(6~15자)"
                type="password"
                autoComplete="current-password"
              />
              <div className={styles.Join_form_btn}>
                <Button
                  className={styles.signup_btn}
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
