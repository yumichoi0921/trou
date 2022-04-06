import React from "react";
import { styled, Box } from "@mui/material";
const Item = styled(Box)({
  backgroundColor: "#e1f5fe",
  borderRadius: 16,
  padding: 5,
  "&:hover": {
    backgroundColor: "#e1f5fe",
    opacity: [0.9, 0.8, 0.7],
  },
});

export default Item;
