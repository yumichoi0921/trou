import { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";

import PlanStep3 from "./components/plan/step3/PlanStep3";
import MyPage from "./components/myPage/MyPage";
import TripDetail from "./components/myPage/TripDetail";
import Main from "./components/main/Main";
import Login from "./components/FirstMain/Login";
import Join from "./components/FirstMain/Join";
import Detail from "./components/plan/detail/Detail";
import Plan from "./components/plan/Plan";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
      <div className="header">
        <Header />
      </div>
      <div className="container">
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/mypage/" element={<MyPage />} />
          <Route path="/tripDetail" element={<TripDetail />} />
          <Route path="/check" element={<PlanStep3 />} />
          <Route path="/plan/*" element={<Plan />} />
          <Route path="/planDetail/:planId" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
