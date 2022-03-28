package com.b203.trou.model.trip;

import com.b203.trou.entity.trip.TripPlan;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@Data
public class TripPlanDto {
    long planId = 0;
    LocalDate startDate;
    LocalDate endDate;


//    public TripPlanDto(LocalDate startDate, LocalDate endDate) {
//        this.startDate = startDate;
//        this.endDate = endDate;
//    }

    public TripPlanDto(TripPlan tripPlan) {
        this.planId = tripPlan.getId();
        this.startDate = tripPlan.getStartDate();
        this.endDate = tripPlan.getEndDate();
    }
}
