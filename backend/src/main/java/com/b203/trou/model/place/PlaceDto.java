package com.b203.trou.model.place;

import com.b203.trou.entity.place.Place;
import com.b203.trou.model.review.ReviewDto;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PlaceDto {
    public PlaceDto(Place place){
        this.reviews= place.getReviews().stream().map(ReviewDto::new).collect(Collectors.toList());
        this.placeName=place.getPlaceName();
        this.image=place.getFirstImage();
        this.placeId=place.getId();
        this.mapX=place.getMapX();
        this.mapY=place.getMapY();
        this.readCount=place.getReadCount();
        this.averageScore = reviews.stream().mapToDouble(ReviewDto::getScore).average().orElse(0.0);

    }
    public PlaceDto(List<ReviewDto> reviews, String placeName, String image) {
        this.reviews = reviews;
        this.placeName = placeName;
        this.image = image;
    }

    List<ReviewDto> reviews;
    String placeName;
    String image;
    long placeId;
    double mapX;
    double mapY;
    int readCount;
    double averageScore;

}
