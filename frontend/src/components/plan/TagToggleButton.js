import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { Box } from "@mui/system";

function TagList({ tags, setTags }) {
  async function reverseButton(index) {
    tags[index].isSelected = !tags[index].isSelected;
    console.log(tags[index].tagName + " " + tags[index].isSelected);
  }
  useEffect(() => {
    async function getTags() {
      const res = await axios.get("http://localhost:8080/tag");
      console.log(res.data.length);
      const resTags = res.data;
      setTags(
        resTags.map((resTag) => {
          const tag = {
            tagId: resTag.tagId,
            tagName: resTag.tagName,
            isSelected: false,
          };
          return tag;
        })
      );
    }
    getTags();
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ "& button": { m: 2 } }}>
        {tags.map((tag, index) => (
          <Button
            onClick={() => reverseButton(index)}
            id={tag.tagId}
            key={tag.tagId}
            color="info"
            variant="contained"
          >
            {tag.tagName}
          </Button>
        ))}
      </Box>
    </React.Fragment>
  );
}

export default TagList;
