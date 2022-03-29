package com.b203.trou.model.review;

import com.b203.trou.entity.review.Review;
import com.b203.trou.entity.review.Score;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewDto {


    long reviewId;
    String userName;
    String content;
    int score;

    public ReviewDto(Review review) {
        this.reviewId = review.getId();
        this.userName = review.getUser().getUserName();
        this.content = review.getContent();
        this.score = review.getScore();
    }
}
