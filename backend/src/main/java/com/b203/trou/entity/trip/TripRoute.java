package com.b203.trou.entity.trip;

import com.b203.trou.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
@Setter
public class TripRoute extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "routeId")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "planId")
    private TripPlan tripPlan;

    private LocalDate routeDate;

    private String memo;

    private int day;

    public TripRoute(TripPlan tripPlan, LocalDate routeDate, String memo, int day) {
        this.tripPlan = tripPlan;
        this.routeDate = routeDate;
        this.memo = memo;
        this.day = day;
    }
}
