package com.b203.trou.model.trip;

import com.b203.trou.entity.trip.TripOrder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.time.LocalTime;

@NoArgsConstructor
@Data
public class TripOrderDto {
    // placeName도 있어야 하지 않나..?
    long orderId;
    long routeId;
    long placeId;
    String placeName;
    int tripOrder;
    @DateTimeFormat(pattern = "kk:mm")
    LocalTime startTime;
    @DateTimeFormat(pattern = "kk:mm")
    LocalTime endTime;
    String image;

    public TripOrderDto(TripOrder tripOrder) {
        this.orderId = tripOrder.getId();
        this.routeId = tripOrder.getTripRoute().getId();
        this.placeId = tripOrder.getPlace().getId();
        this.placeName = tripOrder.getPlace().getPlaceName();
        this.tripOrder = tripOrder.getTripOrder();
        this.startTime = tripOrder.getStartTime();
        this.endTime = tripOrder.getEndTime();
    }


}
