import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Area from "../child/Area";
import Item from "../child/Item";

function DateDetails(props) {
  const [curPage, setPage] = useState(1);
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

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
          ml={3}
        >
          <Button variant="outlined">
            <Link to="/plan/step1">뒤로가기</Link>
          </Button>
          <Button variant="contained">일정생성</Button>
        </Stack>
      </Grid>
    </Area>
  );
}

export default DateDetails;
