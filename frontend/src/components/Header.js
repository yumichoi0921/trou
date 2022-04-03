import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Stack } from "@mui/material";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <Tabs>
      <Tab label="MyPage" onClick={() => navigate("/mypage")} />
      <Tab label="LogOut" />
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
