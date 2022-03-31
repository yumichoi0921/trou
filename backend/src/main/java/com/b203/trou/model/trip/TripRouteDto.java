package com.b203.trou.model.trip;

import com.b203.trou.entity.trip.TripRoute;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@Data
public class TripRouteDto {
    long routeId;
    long planId;
    String memo;
    LocalDate routeDate;
    int day;

    public TripRouteDto(TripRoute tripRoute) {
        this.routeId = tripRoute.getId();
        this.planId = tripRoute.getTripPlan().getId();
        this.memo = tripRoute.getMemo();
        this.routeDate = tripRoute.getRouteDate();
        this.day = tripRoute.getDay();
    }

}
