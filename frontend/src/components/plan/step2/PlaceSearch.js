import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import Area from "../child/Area";
import Item from "../child/Item";
import axios from "axios";

export default function PlaceSearch(props) {
  const [keyword, setKeyword] = React.useState("");

  React.useEffect(() => {
    async function getTags() {
      const res = await axios.get(
        "http://localhost:8080/restaurant/" + keyword
      );
      props.setRestaurants(res.data);
    }
    getTags();
  }, [keyword]);

  return (
    <Item sx={{ "& > :not(style)": { m: 1 } }}>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">장소 검색</InputLabel>
        <Input
          id="input-with-icon-adornment"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Item>
  );
}
