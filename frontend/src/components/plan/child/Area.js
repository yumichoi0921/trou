import React from "react";
import { styled, Box } from "@mui/material";
const Area = styled(Box)({
  height: 600,
  backgroundColor: "#b3e5fc",
  padding: 25,
  "&:hover": {
    backgroundColor: "#81d4fa",
    opacity: [0.9, 0.8, 0.7],
  },
});

export default Area;
