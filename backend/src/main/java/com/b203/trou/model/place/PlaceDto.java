package com.b203.trou.model.place;

import com.b203.trou.entity.place.Place;
import com.b203.trou.model.review.ReviewDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class PlaceDto {
    public PlaceDto(Place place){
        this.reviews= place.getReviews().stream().map(ReviewDto::new).collect(Collectors.toList());
        this.placeName=place.getPlaceName();
        this.image=place.getFirstImage();
    }

    List<ReviewDto> reviews;
    String placeName;
    String image;
    long placeId;

}
