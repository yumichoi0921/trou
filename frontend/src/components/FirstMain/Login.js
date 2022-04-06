import backgroundVideo from "../img/background.mp4";
import styles from "../FirstMain/FirstMain.module.css";
import * as React from "react";
import { useState } from "react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import {loginCheck} from '../../store';

const clientId =
  "913002487026-ehbp4pgqmf5ts3lnb05i0h6587tf4e14.apps.googleusercontent.com";

export default function Login() {
  const tmp = useSelector((state) => state);
  const dispatch = useDispatch();

  const onSuccess = async (response) => {
    alert('구글 로그인 성공!');
    console.log(response);
    // const { googleId, profileObj : { email, name } } = response;
    // await onGoogleLogin (
    //   // 구글 로그인 성공시 서버에 전달할 데이터
    // );
  };

  const onFailure = (error) => {
    console.log(error);
  };

  const [userEmail, setUserEmaill] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const Login = () => { 
    if (userEmail == "" && userPassword == "") {
      alert("아이디 또는 비밀번호를 입력해주세요.");
    } else {
      let body = {
        email: userEmail,
        password: userPassword
      }
      axios.post("/users/signin", body).then((res) => {
        alert('로그인 성공!');
        console.log('회원 정보 : ', res.data);
        localStorage.setItem('token', res.data.tocken);
        console.log(tmp);
        dispatch(loginCheck(res.data.user.userId));
        console.log(tmp);
        // => history.push로 변경하기?
        document.location.href = '/main'; 
      }).catch(error => {
        alert("아이디 또는 비밀번호를 확인해주세요.");
        setUserEmaill("");
        setUserPassword("");
      })
    }
  }

  return (
    <div className={styles.backgound}>
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className={styles.login}>
        <Card>
          <p className={styles.logi_title}>Login</p>
          <CardContent>
            {/* <Typography variant="body1" component="p">
              Please enter something. <br />
            </Typography> */}
            <form>
              <p className={styles.input_title}>ID</p>
              <TextField
                className={styles.input_text}
                required
                id="outlined-required"
                label="이메일를 입력하세요."
                type="text"
                value={userEmail}
                // onKeyPress={ Login }
                onChange={ (e)=>setUserEmaill(e.target.value)}
              />
              <p className={styles.input_title}>PW</p>
              <TextField
                className={styles.input_text}
                id="outlined-password-input"
                label="비밀번호를 입력하세요(6~15자)"
                type="password"
                autoComplete="current-password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                // onKeyPress={ Login }
              />
              <div className={styles.form_link}>
                <span className={styles.join_btn}>
                  <Link to="/join">회원가입</Link>
                </span>
                <span className={styles.line}>|</span>
                <span className={styles.findpw_btn} onClick={() => {}}>
                  비밀번호 찾기
                </span>
              </div>

              <div className={styles.login_btn}>
                <Button variant="contained" size="large" onClick={Login}>
                  Login
                </Button>
              </div>

              {/* <img src={or} alt="or"></img> */}
              {/* <div className={styles.or}>
                <hr className={styles.left_line}></hr>
                <span> 또는 </span>
                <hr className={styles.right_line}></hr>
              </div>
              <div className={styles.goole_login_btn}>
                <GoogleLogin
                  clientId={clientId}
                  responseType={"id_token"}
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                />
              </div> */}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
