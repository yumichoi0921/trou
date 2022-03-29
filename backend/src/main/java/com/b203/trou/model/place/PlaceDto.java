package com.b203.trou.model.place;

import com.b203.trou.model.review.ReviewDto;
import lombok.AllArgsConstructor;

import java.util.List;
@AllArgsConstructor
public class PlaceDto {

    List<ReviewDto> reviews;
    String placeName;
    String image;

}
