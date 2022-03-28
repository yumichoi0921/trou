/* global kakao */
import React, { Fragment, useEffect } from "react";
import { styled, Grid, Box, Button, Stack, Collapse } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";


const Detail = () =>{
    return (
        <Fragment>
            <Grid container spacing={1}>
                <Grid item md={3} sx={{ textAlign: "center" }}>
                <Area>
                    <Stack spacing={2}>
                    <Route />
                    <Route />
                    <Stack
                        spacing={2}
                        direction="row"
                        sx={{ justifyContent: "center", my: 3 }}
                    >
                        <Button variant="contained">Contained</Button>
                        <Button variant="outlined">Outlined</Button>
                    </Stack>
                    </Stack>
                </Area>
                </Grid>
                <Grid item md={9}>
                <Area>
                    <KakaoMap></KakaoMap>
                    <Stack
                    spacing={2}
                    direction="row"
                    sx={{ justifyContent: "center", my: 3 }}
                    >
                    <Button variant="contained">Contained</Button>
                    <Button variant="outlined">Outlined</Button>
                    </Stack>
                </Area>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Detail;