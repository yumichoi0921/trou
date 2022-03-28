package com.b203.trou.model.tag;

import com.b203.trou.entity.tag.Tag;
import lombok.Getter;

@Getter
public class TagDto {

    long tagId;
    String tagName;

    public TagDto(Tag tag) {
        this.tagId = tag.getId();
        this.tagName = tag.getTagName();
    }
}
