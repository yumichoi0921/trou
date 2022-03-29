package com.b203.trou.model.user;

import com.b203.trou.entity.tag.Tag;
import com.b203.trou.model.review.ReviewDto;
import com.b203.trou.model.tag.TagDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class userDto {
    long userId;
    String email;
    String password;
    String userName;
    List<TagDto> tags;
    List<ReviewDto> reviews;

}
