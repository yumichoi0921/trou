/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* global kakao */
import React, { Fragment, useEffect, useState } from "react";
import { styled, Grid, Box, Button, Stack, Paper, Divider, Menu, MenuItem, alpha, TextareaAutosize, Avatar, InputLabel, FormControl, Select } from "@mui/material";
import { ExpandMore, ExpandLessSharp } from "@mui/icons-material";
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Area = styled(Box)({
    minHeight: '100%',
    backgroundColor: "#90caf9",
    padding: 25,
    "&:hover": {
        backgroundColor: "#64b5f6",
        opacity: [0.9, 0.8, 0.7],
    },
});

const Local = styled(Box)({
    // minHeight: '90%',
    backgroundColor: "#F1F9FA",
    padding: 25,
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const KakaoMap = () => {
    useEffect(() => {
        var container = document.getElementById("map");
        var options = {
            center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
            level: 3,
        };
        var map = new kakao.maps.Map(container, options);
    }, []);

    return (
        <div>
            <div id="map" style={{ width: "100%", height: "500px" }}></div>
        </div>
    );
};

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


// 공유된 친구 이름 props로 받아서 넣기                    
const ShareFriends = () => {
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
            <Button variant="outlined">공유</Button>

        </Stack>


    );
};

const Memo = () => {
    return (
        <Stack direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1} >
            <p>메모장</p>
            <TextareaAutosize
                aria-label="minimum height"
                minRows={10}
                placeholder="Minimum 3 rows"
                style ={{ width: '90%' }}
            />
            <Button variant="outlined">수정</Button>
        </Stack>
    );
};

const Weather = () => {
    return (
        <Stack direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1} >
            <p>날씨</p>
            {/* <Avatar src="../../../broken-image.jpg" /> */}
            <Avatar src="C:\SSAFY\workspace\work-trou\frontend\src\imgs\sun.png" />
        </Stack>
    );
};

// const StyledMenu = styled((props) => (
//     <Menu
//         elevation={0}
//         anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'right',
//         }}
//         transformOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//         }}
//         {...props}
//     />
// ))(({ theme }) => ({
//     '& .MuiPaper-root': {
//         borderRadius: 6,
//         marginTop: theme.spacing(1),
//         minWidth: 180,
//         color:
//             theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
//         boxShadow:
//             'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//         '& .MuiMenu-list': {
//             padding: '4px 0',
//         },
//         '& .MuiMenuItem-root': {
//             '& .MuiSvgIcon-root': {
//                 fontSize: 18,
//                 color: theme.palette.text.secondary,
//                 marginRight: theme.spacing(1.5),
//             },
//             '&:active': {
//                 backgroundColor: alpha(
//                     theme.palette.primary.main,
//                     theme.palette.action.selectedOpacity,
//                 ),
//             },
//         },
//     },
// }));

// const Datepicked = () => {
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const open = Boolean(anchorEl);
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     <><Button
//         id="demo-customized-button"
//         aria-controls={open ? 'demo-customized-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         variant="contained"
//         disableElevation
//         onClick={handleClick}
//         endIcon={<KeyboardArrowDownIcon />}
//     >
//         Options
//     </Button><StyledMenu
//         id="demo-customized-menu"
//         MenuListProps={{
//             'aria-labelledby': 'demo-customized-button',
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//     >
//             <MenuItem onClick={handleClose} disableRipple>
//                 <EditIcon />
//                 Edit
//             </MenuItem>
//             <MenuItem onClick={handleClose} disableRipple>
//                 <FileCopyIcon />
//                 Duplicate
//             </MenuItem>
//             <Divider sx={{ my: 0.5 }} />
//             <MenuItem onClick={handleClose} disableRipple>
//                 <ArchiveIcon />
//                 Archive
//             </MenuItem>
//             <MenuItem onClick={handleClose} disableRipple>
//                 <MoreHorizIcon />
//                 More
//             </MenuItem>
//         </StyledMenu></>
// };


const Detail = () => {
    const [day, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={4}>
                        <Area>
                            <Stack spacing={2} divider={<Divider variant="middle" />}>
                                <Local>
                                    <Memo></Memo>
                                </Local>
                                <Local>
                                    <ShareFriends></ShareFriends>
                                </Local>
                            </Stack>
                        </Area>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={3} >
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Button variant="contained">수정하기</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        {/* 월 일 리스트 가져와서 출력하기 + 일차 바뀌면 바뀐거 반영되야함 */}
                                        <InputLabel id="demo-simple-select-label">날짜</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={day}
                                            label="Day"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={1}>1일차</MenuItem>
                                            <MenuItem value={2}>2일차</MenuItem>
                                            <MenuItem value={3}>3일차</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <Weather></Weather>
                                </Grid>
                            </Grid>
                            <Item>
                                <p>상태바 자리</p>
                            </Item>
                            <Item>
                                <KakaoMap></KakaoMap>
                            </Item>
                        </Stack>

                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
};

export default Detail;