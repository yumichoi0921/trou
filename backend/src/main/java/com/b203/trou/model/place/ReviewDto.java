package com.b203.trou.model.place;

import com.b203.trou.entity.review.Score;
import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
public class ReviewDto {
    public ReviewDto(String userName, String content, Score score) {
        this.userName = userName;
        this.content = content;
        this.score = score;
    }

    String userName;
    String content;
    Score score;


}
