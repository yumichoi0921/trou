package com.b203.trou.model.tag;

import com.b203.trou.entity.tag.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TagDto {

    long tagId;
    String tagName;

    public TagDto(Tag tag) {
        this.tagId = tag.getId();
        this.tagName = tag.getTagName();
    }
}
