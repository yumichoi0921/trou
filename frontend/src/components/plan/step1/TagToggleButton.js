import React, { useEffect, useState } from "react";
import { Button, styled } from "@mui/material";
import axios from "axios";

const TagButton = styled(Button)((props) => ({
  backgroundColor: props.colored,
  color: "#0d47a1",
  "&:hover": {
    backgroundColor: "#90caf9",
    borderColor: "#0062cc",
  },
}));
function TagList({ tag }) {
  async function reverseButton(index) {
    const newTags = [...tag.tags];
    newTags[index].isSelected = !newTags[index].isSelected;
    newTags[index].color = newTags[index].isSelected ? "#64b5f6" : "#e3f2fd";
    tag.setTags(newTags);
    console.log(newTags[index].tagName + " " + newTags[index].isSelected);
    console.log(newTags[index].tagName + " " + newTags[index].color);
    const setTag = tag.selectedTags;
    if (newTags[index].isSelected) {
      setTag.push(newTags[index]);
    } else {
      tag.setSelectedTags(tag.selectedTags.filter((t) => t !== newTags[index]));
    }
    console.log(tag.selectedTags);
  }
  useEffect(() => {
    async function getTags() {
      const res = await axios.get("http://localhost:8080/tag");
      const resTags = res.data;
      tag.setTags(
        resTags.map((resTag) => {
          const tag = {
            tagId: resTag.tagId,
            tagName: resTag.tagName,
            isSelected: false,
            color: "#e3f2fd",
          };
          return tag;
        })
      );
    }
    getTags();
  }, []);

  const tagList = tag.tags.map((tag, index) => (
    <TagButton
      onClick={() => reverseButton(index)}
      id={tag.tagId}
      key={tag.tagId}
      colored={tag.color}
      variant="contained"
      sx={{ m: 1 }}
    >
      {tag.tagName}
    </TagButton>
  ));

  return <React.Fragment>{tagList}</React.Fragment>;
}

export default TagList;
