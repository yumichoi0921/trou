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
export default function Join() {
  const emailList = [
    { label: "naver.com" },
    { label: "hanmail.net" },
    { label: "gamil.com" },
    { label: "ssafy.com" },
  ];

  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [userName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  //중복 체크를 했는지 확인   변수
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);


  const onCheckPassword = (e) => { 
    setPassword(e.target.value);
    if (e.target.value.length >= 6 && e.target.value.length <= 15) { 
      setCheckPassword(true);
    } 
  }
  // 이메일 중복 확인
  const email = email1 + '@'+ email2;
  const checkUserEmail = () => {

  
    axios.get("/users/check/" + email).then((res) => {
      console.log(email);
      if (res.status == 200) { 
        alert("사용 가능한 아이디 입니다.");
        setCheckEmail(true);
      } 
    }).catch(error => {
      alert("이미 사용중인 아이디 입니다.");
    setEmail1("")
    setEmail2 ("") })
  };

// 가입 하기
  const SignUp = () => { 
    
    if (!checkEmail) {
      alert("이메일 중복 확인을 해주세요.")
    } else if (!checkPassword) {
      alert("비밀번호를 확인해주세요");
      setPassword("");
    } else if (password!=passwordCheck) { 
      alert("비밀번호가 맞지 않습니다.");
      setPasswordCheck("");
    } else { 

      let body = {
        email: email,
        password: password,
        name: userName
      }
      // console.log(body);
      axios.post("/users/signup", body ).then((res) => {
        // localStorage.setItem('userId', res.data.user.userId);
        console.log(res);
        alert("회원 가입 완료!");
        document.location.href = '/login'
      }).catch(error => {
        alert("가입 실패!");
        })

      
    }
   
  
  }



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
              <Stack spacing={4} direction="row">
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
               <h3 className={styles.email_text_h}>@</h3>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={emailList}
                  sx={{ width: 200 }}
                  onChange={(event, option) => setEmail2(option.label)}
                  renderInput={(params) => (
                    <TextField {...params} label="email 선택" />
                  )}
                  value={email2}
                />

                <Button
               
                  variant="contained"
                  onClick={checkUserEmail}
                >
                  중복확인
                </Button>
              </Stack>
              <p className={styles.input_title}>Name</p>
              <TextField
                className={styles.input_text}
                onChange={(e) => setName(e.target.value)}
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
                onChange={onCheckPassword}
                label="비밀번호를 입력하세요(6~15자)"
                type="password"
                autoComplete="current-password"
              />
              <p className={styles.input_title}>PW Check</p>
              <TextField
                className={styles.input_text}
                id="outlined-password-input"
                onChange={(e) => setPasswordCheck(e.target.value)}
                label="비밀번호를 다시 입력하세요"
                type="password"
                autoComplete="current-password"
              />
              <div className={styles.Join_form_btn}>
                <Button
                  className={styles.signup_btn}
                  variant="contained"
                  size="large"
                  onClick={SignUp}
                >
                  가입하기
                </Button>
                
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
