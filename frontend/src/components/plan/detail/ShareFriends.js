import {Stack, Grid, Avatar} from "@mui/material";
import ShareModal from "./ShareModal"

// 공유된 친구 이름 props로 받아서 넣기                    
const ShareFriends = () => {
    function stringToColor(string) {
        let hash = 0;
        let i;
        
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
    
        let color = '#';
    
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
        
        return color;
    }
    
    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }
    
    return (
        <Stack direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1} >
            <p>초대 친구들</p>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Avatar {...stringAvatar('Kent Dodds')} />
                </Grid>
                <Grid item xs={6}>
                    <Avatar {...stringAvatar('Jed Watson')} />
                </Grid>
                <Grid item xs={6}>
                    <Avatar {...stringAvatar('Tim Neutkens')} />
                </Grid>
            </Grid>
            <ShareModal></ShareModal>
            {/* <Button variant="outlined">공유</Button> */}

        </Stack>
    );
};

export default ShareFriends;