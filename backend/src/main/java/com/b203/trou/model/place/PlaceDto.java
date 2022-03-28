package com.b203.trou.model.place;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
@AllArgsConstructor
@Getter
public class PlaceDto {

    List<ReviewDto> reviews;
    String placeName;
    String image;

}
