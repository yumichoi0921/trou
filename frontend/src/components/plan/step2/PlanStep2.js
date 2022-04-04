import React, { Fragment, useEffect, useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Date from "../Date";
import TagToggleButton from "../step1/TagToggleButton";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import Area from "../child/Area";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function PlanStep2(props) {
  const [curPage, setPage] = useState(1);
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  function createPlan() {
    if (curPage === 3) return;
    setPage(curPage + 1);
  }
  function prevPage() {
    if (curPage === 1) return;
    setPage(curPage - 1);
  }
  return (
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
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                날짜선택
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Grid item md={5}>
            <Item>출발지</Item>
          </Grid>
          <Grid item md={7}>
            <Item>부산</Item>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Grid item md={5}>
            <Item>도착지</Item>
          </Grid>
          <Grid item md={7}>
            <Item>호텔</Item>
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
                뒤로가기
              </Button>
            ) : (
              <Box></Box>
            )}
            <Button variant="contained" onClick={createPlan}>
              일정생성
            </Button>
          </Stack>
        </Grid>
      </Area>
    </Grid>
  );
}
