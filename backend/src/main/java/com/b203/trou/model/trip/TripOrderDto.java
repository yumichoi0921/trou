package com.b203.trou.model.trip;

import com.b203.trou.entity.review.Review;
import com.b203.trou.entity.trip.TripOrder;
import com.b203.trou.model.place.PlaceDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.time.LocalTime;
import java.util.stream.DoubleStream;

@NoArgsConstructor
@Data
public class TripOrderDto {

    long orderId;
    long routeId;
    int tripOrder;
    @DateTimeFormat(pattern = "kk:mm")
    LocalTime startTime;
    @DateTimeFormat(pattern = "kk:mm")
    LocalTime endTime;
    PlaceDto place;


    public TripOrderDto(TripOrder tripOrder) {
        this.orderId = tripOrder.getId();
        this.routeId = tripOrder.getTripRoute().getId();
        this.place = PlaceDto.builder().placeId(tripOrder.getPlace().getId())
                .placeName(tripOrder.getPlace().getPlaceName())
                .image(tripOrder.getPlace().getFirstImage())
                .averageScore(tripOrder.getPlace().getReviews().stream().mapToDouble(Review::getScore).average().orElse(0.0))
                .mapX(tripOrder.getPlace().getMapX())
                .mapY(tripOrder.getPlace().getMapY())
                .build();
        this.tripOrder = tripOrder.getTripOrder();
        this.startTime = tripOrder.getStartTime();
        this.endTime = tripOrder.getEndTime();
    }


}
