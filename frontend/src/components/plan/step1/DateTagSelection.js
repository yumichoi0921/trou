import Step1DatePicker from "./Step1DatePicker";
import TagToggleButton from "./TagToggleButton";
import { Button, Stack, styled, Box, Grid } from "@mui/material";
import Area from "../child/Area";
import Item from "../child/Item";
import React, { useState, useEffect } from "react";
import { Link, Routes } from "react-router-dom";

const PlanStep1 = (props) => {
  useEffect(() => {
    const setDate = async () => {
      try {
        const plan = {
          startDate: props.startDate,
          endDate: props.endDate,
          routes: [],
        };
        props.setPlan(plan);
        console.log(plan);
      } catch (e) {
        console.log(e);
      }
    };
    setDate();
  }, [props.startDate, props.endDate]);

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
          <Step1DatePicker
            date={props.date.startDate}
            setDate={props.date.setStartDate}
            str={"start"}
          />
        </Grid>
        <Grid item md={5}>
          <Item>돌아오는 날</Item>
        </Grid>
        <Grid item md={7}>
          <Step1DatePicker
            date={props.date.endDate}
            setDate={props.date.setEndDate}
            str={"end"}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item md={6}>
          <Item>태그 선택</Item>
        </Grid>
        <Grid item>
          <Grid item>
            <TagToggleButton tag={props.tag}></TagToggleButton>
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
            <Link to="/plan/step2">다음</Link>
          </Button>
        </Stack>
      </Grid>
    </Area>
  );
};

export default PlanStep1;
