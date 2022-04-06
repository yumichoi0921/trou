import { useNavigate } from "react-router-dom";
import { Tab, Stack, Box } from "@mui/material";

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
