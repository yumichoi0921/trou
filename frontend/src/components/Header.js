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
        <Box>
          <h1 onClick={() => navigate("/main")}>TROU</h1>
        </Box>
        <Box>
          <Tab
            value="mypage"
            label="MyPage"
            onClick={() => navigate("/mypage")}
          />
          <Tab
            value="logout"
            label="LogOut"
            onClick={() => console.log("로그아웃")}
          />
        </Box>
      </Stack>
    </header>
  );
};

export default Header;
