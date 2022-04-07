import backgroundVideo from "../img/background.mp4";
import styles from "../FirstMain/FirstMain.module.css";
import * as React from "react";
import { useState } from "react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { loginCheck,saveSendData } from "../../store";
// import { useHistory } from "react-router";

export default function Login() {
  const tmp = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userEmail, setUserEmaill] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const tmpPlan = {
    startDate: "2022-04-04",
    endDate: "2022-04-06",
    routes: [
      {
        routeId: 0,
        routeDate: "2022-04-04",
        startPlace: {},
        endPlace: {},
        day: 1,
        order: [
          {
            tripOrder: 1,
            place: {
              placeId: 126438,
              placeName: "start",
              mapX: 126.5594730066,
              mapY: 33.2445341254,
            },
          },
          {
            tripOrder: 2,
            place: {
              placeId: 126445,
              placeName: "A",
              mapX: 126.908342042,
              mapY: 33.520231492,
            },
          },
          {
            tripOrder: 3,
            place: {
              placeId: 126452,
              placeName: "B",
              mapX: 126.7706788052,
              mapY: 33.5280478463,
            },
          },
          {
            tripOrder: 4,
            place: {
              placeId: 126456,
              placeName: "end",
              mapX: 126.5581440803,
              mapY: 33.4237615317,
            },
          },
        ],
      },
    ],
  };

  const Login = () => {
    const em = userEmail;
    const pa = userPassword;
    if (em === "" && pa === "") {
      alert("아이디 또는 비밀번호를 입력해주세요.");
    } else {
      let body = {
        email: userEmail,
        password: userPassword
      }
      axios.post("/users/signin", body).then((res) => {
        alert('로그인 성공!');
        console.log('회원 정보 : ', res.data);
        localStorage.setItem('token',res.data.tocken);
        localStorage.setItem('userId', res.data.user.userId);
        console.log(res.data.user.userId);
        console.log('전 ! ',tmp);
        dispatch(loginCheck(res.data.user.userId));
        dispatch(saveSendData(tmpPlan));
        console.log('후 ! ',tmp);
        // => history.push로 변경하기?
        navigate('/main')
        // document.location.href = '/main';
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
