/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Stack } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { logOutCheck } from "../store";

const Nav = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  console.log("isLogin ? ? ", isLogin);

  return (
    <Tabs>
      <Tab label="MyPage" onClick={() => navigate("/mypage")} />
      {isLogin ? 
      (<Tab label="LogOut" onClick={() => {
        localStorage.removeItem('token');
        dispatch(logOutCheck())}} />) 
      : 
      (<Tab label="LogIn" onClick={() => {
        document.location.href = '/login';}}
      />)}
    </Tabs>
  );
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h1 onClick={() => navigate("/main")}>TROU</h1>
        <Nav />
      </Stack>
    </header>
  );
};

export default Header;
