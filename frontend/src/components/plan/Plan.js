import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Button, Stack, styled, Box, Grid } from "@mui/material";
import Date from "./Date";
import TagToggleButton from "./TagToggleButton";
import KakaoMap from "./KakaoMap";
import Area from "./child/Area";
import Item from "./child/Item";

export default function FullWidthGrid() {
  const [tags, setTags] = useState([]);
  const [curPage, setPage] = useState(1);

  function nextPage() {
    if (curPage === 3) return;
    setPage(curPage + 1);
  }
  function prevPage() {
    if (curPage === 1) return;
    setPage(curPage - 1);
  }
  return (
    <Fragment>
      <Grid container spacing={1}>
        {/* Grid 왼쪽 부분 */}
        <Grid item md={3} sx={{ textAlign: "center" }}>
          <Area sx={{ overflow: "auto" }} spacing={3}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <Grid item md={5}>
                <Item>여행지</Item>
              </Grid>
              <Grid item md={7}>
                <Item>부산</Item>
              </Grid>
              <Grid item md={5}>
                <Item>가는 날</Item>
              </Grid>
              <Grid item md={7}>
                <Date />
              </Grid>
              <Grid item md={5}>
                <Item>돌아오는 날</Item>
              </Grid>
              <Grid item md={7}>
                <Date />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item md={6}>
                <Item>태그 선택</Item>
              </Grid>
              <Grid item>
                <Grid item>
                  <TagToggleButton
                    tags={tags}
                    setTags={setTags}
                  ></TagToggleButton>
                </Grid>
              </Grid>
              <Grid item>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                  mt={3}
                  mr={3}
                >
                  {curPage !== 1 ? (
                    <Button variant="outlined" onClick={prevPage}>
                      이전
                    </Button>
                  ) : (
                    <Box></Box>
                  )}
                  <Button variant="contained" onClick={nextPage}>
                    다음
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Area>
        </Grid>

        {/* Grid 오른쪽 */}
        <Grid item md={9}>
          <Area sx={{ overflow: "auto" }}>
            <KakaoMap></KakaoMap>
          </Area>
        </Grid>
      </Grid>
    </Fragment>
  );
}
