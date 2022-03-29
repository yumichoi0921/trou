package com.b203.trou.model.place;

import com.b203.trou.entity.review.Review;
import com.b203.trou.entity.review.Score;
import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
public class ReviewDto {
    public ReviewDto(Review review) {
        this.userName = review.getUser().getUserName();
        this.content = review.getContent();
        this.score = review.getScore();
    }

    public ReviewDto(String userName, String content, Score score) {
        this.userName = userName;
        this.content = content;
        this.score = score;
    }

    String userName;
    String content;
    Score score;


}
