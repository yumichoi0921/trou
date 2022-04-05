import Date from "./Step1DatePicker";
import TagToggleButton from "./TagToggleButton";
import { Button, Stack, styled, Box, Grid } from "@mui/material";
import Area from "../child/Area";
import Item from "../child/Item";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PlanStep1 = (props) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    const setDate = async () => {
      try {
        const plan = {
          startDate: startDate,
          endDate: endDate,
          routes: [],
        };
        props.setPlan(plan);
        console.log(plan);
      } catch (e) {
        console.log(e);
      }
    };
    setDate();
  }, [startDate, endDate]);

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
          <Date date={startDate} setDate={setStartDate} />
        </Grid>
        <Grid item md={5}>
          <Item>돌아오는 날</Item>
        </Grid>
        <Grid item md={7}>
          <Date date={endDate} setDate={setEndDate} />
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
              selectedTags={props.selectedTags}
              setSelectedTags={props.setSelectedTags}
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
          ml={3}
        >
          <Box></Box>

          <Button variant="contained">
            <Link to="step2">다음</Link>
          </Button>
        </Stack>
      </Grid>
    </Area>
  );
};

export default PlanStep1;
