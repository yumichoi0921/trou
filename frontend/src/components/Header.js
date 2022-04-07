/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Stack, Box } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { logOutCheck } from "../store";
import title from "./img/MainTitle.png";

const Nav = () => {
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const userId = useSelector((state) => state.userInfo.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("isLogin ? ? ", isLogin);
  console.log("userId ? ? ", userId);

  return (
    <Tabs>
      <Tab value="mypage"
        label="MyPage"
        onClick={() => navigate("/mypage")}
      />
      {isLogin ?
        (<Tab value="logout" label="LogOut" onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('userName');
          dispatch(logOutCheck())
          navigate('/')
        }} />)
        :
        (<Tab value="login" label="LogIn" onClick={() => navigate('/login')}
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
        <img onClick={() => navigate("/main")} src={title} alt="title" ></img>
          {/* <h1 onClick={() => navigate("/main")}>TROU</h1> */}
        </Box>
        <Box>
          <Nav></Nav>
        </Box>
      </Stack>
    </header>
  );
};

export default Header;
