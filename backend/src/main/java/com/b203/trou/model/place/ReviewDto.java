package com.b203.trou.model.place;

import com.b203.trou.entity.review.Score;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ReviewDto {

    String userName;
    String content;
    Score score;




}
