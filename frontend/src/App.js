import { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Check from "./components/plan/step3/Check";
import MyPage from "./components/myPage/MyPage";
import TripDetail from "./components/myPage/TripDetail";
import Main from "./components/main/Main";
import Login from "./components/FirstMain/Login";
import Join from "./components/FirstMain/Join";
import Detail from "./components/plan/detail/Detail";
import Plan from "./components/plan/Plan";
const App = () => {
  const plans = [
    {
      id: 1,
      text: "서울",
      startDate: "2021-03-28",
      endDate: "2021-04-01",
    },
    {
      id: 2,
      text: "서울",
      startDate: "2021-03-28",
      endDate: "2021-04-01",
    },
    {
      id: 3,
      text: "서울",
      startDate: "2021-03-28",
      endDate: "2021-04-01",
    },
    {
      id: 4,
      text: "서울",
      startDate: "2021-03-28",
      endDate: "2021-04-01",
    },
    {
      id: 5,
      text: "서울",
      startDate: "2021-03-28",
      endDate: "2021-04-01",
    },
    {
      id: 6,
      text: "서울",
      startDate: "2021-03-28",
      endDate: "2021-04-01",
    },
    {
      id: 7,
      text: "서울",
      startDate: "2021-03-28",
      endDate: "2021-04-01",
    },
    {
      id: 8,
      text: "서울",
      startDate: "2021-03-28",
      endDate: "2021-04-01",
    },
  ];

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
          <Route path="/check" element={<Check />} />
          <Route path="/plan/*" element={<Plan />} />
          <Route path="/planDetail" element={<Detail />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
