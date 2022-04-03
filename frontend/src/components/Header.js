import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Stack } from "@mui/material";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <Tabs>
      <Tab value="MyPage" label="MyPage" onClick={() => navigate("/mypage")} />
      <Tab value="LogOut" label="LogOut" />
    </Tabs>
  );
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h1 onClick={() => navigate("/")}>TROU</h1>
        <Nav />
      </Stack>
    </header>
  );
};

export default Header;
