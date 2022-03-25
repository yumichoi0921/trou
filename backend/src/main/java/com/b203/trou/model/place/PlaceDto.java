package com.b203.trou.model.place;

import lombok.AllArgsConstructor;

import java.util.List;
@AllArgsConstructor
public class PlaceDto {

    List<ReviewDto> reviews;
    String placeName;
    String image;

}
