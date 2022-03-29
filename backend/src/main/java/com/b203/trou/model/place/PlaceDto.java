package com.b203.trou.model.place;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.List;
@Getter
public class PlaceDto {
    public PlaceDto(List<ReviewDto> reviews, String placeName, String image) {
        this.reviews = reviews;
        this.placeName = placeName;
        this.image = image;
    }

    List<ReviewDto> reviews;
    String placeName;
    String image;

}
