package com.b203.trou.model.review;

import com.b203.trou.entity.review.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ReviewDto {


    long reviewId;
    String name;
    String content;
    int score;

    public ReviewDto(Review review) {
        this.reviewId = review.getId();
        this.name = review.getUser().getName();
        this.content = review.getContent();
        this.score = review.getScore();
    }
}

