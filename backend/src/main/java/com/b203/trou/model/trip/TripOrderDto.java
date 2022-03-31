package com.b203.trou.model.trip;

import com.b203.trou.entity.place.Place;
import com.b203.trou.entity.trip.TripRoute;
import lombok.*;

import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class TripOrderDto {
    Long id;

    TripRoute tripRoute;

    Place place;

    int tripOrder;

    Timestamp startTime;

    Timestamp endTime;
}
