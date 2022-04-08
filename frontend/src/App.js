import { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loginCheck } from "./store";

import Header from "./components/Header";

import PlanStep3 from "./components/plan/step3/PlanStep3";
import MyPage from "./components/myPage/MyPage";
import TripDetail from "./components/myPage/TripDetail";
import Main from "./components/main/Main";

import FirstMain from "./components/FirstMain/FirstMain";
import Login from "./components/FirstMain/Login";
import Join from "./components/FirstMain/Join";
import SelectPlace from "./components/FirstMain/SelectPlace";

import Detail from "./components/plan/detail/Detail";
import Plan from "./components/plan/Plan";
const App = () => {
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const dispatch = useDispatch();
  const localStoragetokenCheck = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    if (localStoragetokenCheck) {
      // 로그인유지를 위해서 isLogin을 true로 userId를 현재 로그인한 id로 변경
      dispatch(loginCheck(userId,userName));
    }
  }, []);
  return (
    <Router>
      {isLogin ? (
        <Header />
      ) : (<></>)}
      <Routes>
        {!isLogin ? (
          <Route path="/" element={<FirstMain />} />)
        : (
          <Route path="/" element={<Main />} />)
        }
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/select" element={<SelectPlace />} />

        <Route path="/main" element={<Main />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/tripDetail/:planId" element={<TripDetail />} />
        <Route path="/check" element={<PlanStep3 />} />
        <Route path="/plan/*" element={<Plan />} />
        <Route path="/planDetail/:planId" element={<Detail />} />

      </Routes>
    </Router>
  );
};

export default App;
