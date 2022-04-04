import {Stack, Grid, Avatar} from "@mui/material";
import { React, useEffect, useState } from "react";
import ShareModal from "./ShareModal";
import axios from "axios";
import ShowFreinds from "./ShowFriends";

// 공유된 친구 이름 props로 받아서 넣기                    
const ShareFriends = (props) => {
    const [friends, setFriends] = useState([]);

    const initShareFriends = async () => {
        await axios.get("/share/" + props.planId).then((res) => {
            console.log(res.data);
            setFriends(res.data);
            // freinds.push(res.data.userName);
        }).catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        initShareFriends();
    }, []);
    
    return (
        <Stack direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1} >
            <p>초대 친구들</p>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {friends.map((friend,index) => (
                    <ShowFreinds key={index} friend={friend}></ShowFreinds>
                ))}
                {/* <Grid item xs={6}>
                    <Avatar {...stringAvatar('Kent Dodds')} />
                </Grid>
                <Grid item xs={6}>
                    <Avatar {...stringAvatar('Jed Watson')} />
                </Grid>
                <Grid item xs={6}>
                    <Avatar {...stringAvatar('Tim Neutkens')} />
                </Grid> */}
            </Grid>
            <ShareModal></ShareModal>
            {/* <Button variant="outlined">공유</Button> */}

        </Stack>
    );
};

export default ShareFriends;