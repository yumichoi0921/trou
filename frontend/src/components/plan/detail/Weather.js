import BackImg from "../../../imgs/sun.png"
import {Stack, Avatar} from "@mui/material";


const Weather = () => {
    return (
        <Stack direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1} >
            <p>날씨</p>
            <Avatar src={BackImg} />
            {/* <Avatar src="C:\SSAFY\workspace\work-trou\frontend\src\imgs\sun.png" /> */}
        </Stack>
    );
};

export default Weather;