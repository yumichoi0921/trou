import Date from "../Date";
import TagToggleButton from "./TagToggleButton";
import { Button, Stack, styled, Box, Grid } from "@mui/material";
import Area from "../child/Area";
import Item from "../child/Item";
import React from "react";

const PlanStep1 = (props) => {
  function nextPage() {
    if (props.curPage === 3) return;
    props.setPage(props.curPage + 1);
  }
  function prevPage() {
    if (props.curPage === 1) return;
    props.setPage(props.curPage - 1);
  }

  return (
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
          <Date date={props.beginDate} setDate={props.setBeginDate} />
        </Grid>
        <Grid item md={5}>
          <Item>돌아오는 날</Item>
        </Grid>
        <Grid item md={7}>
          <Date date={props.endDate} setDate={props.setEndDate} />
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item md={6}>
          <Item>태그 선택</Item>
        </Grid>
        <Grid item>
          <Grid item>
            <TagToggleButton
              tags={props.tags}
              setTags={props.setTags}
            ></TagToggleButton>
          </Grid>
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
          {props.curPage !== 1 ? (
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
    </Area>
  );
};

export default PlanStep1;
