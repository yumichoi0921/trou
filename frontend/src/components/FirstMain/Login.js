import backgroundVideo from "../img/background.mp4";
import styles from "../FirstMain/FirstMain.module.css";
import * as React from "react";
import { useState } from "react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Login() {

  const [userEmail, setUserEmaill] = useState("");
  const [userPassword, setUserPassword] = useState("");


  const Login = () => { 
    const em = userEmail;
    const pa = userPassword;
    if (em == "" && pa == "") {
      alert("아이디 또는 비밀번호를 입력해주세요.");
    } else {
      let body = {
        email: userEmail,
        password: userPassword
      }
      axios.post("/users/signin", body).then((res) => {
        console.log(res);      
        document.location.href = '/main'
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
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
