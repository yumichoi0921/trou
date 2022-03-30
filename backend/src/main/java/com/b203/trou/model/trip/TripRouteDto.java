package com.b203.trou.model.trip;

import com.b203.trou.entity.trip.TripRoute;
import lombok.*;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class TripRouteDto {
    long routeId;
    LocalDate routeDate;
    String memo;
}
