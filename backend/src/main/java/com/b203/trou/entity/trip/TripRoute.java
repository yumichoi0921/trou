package com.b203.trou.entity.trip;

import com.b203.trou.entity.BaseEntity;
import lombok.Getter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Getter
public class TripRoute extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "routeId")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "planId")
    private TripPlan tripPlan;

    private LocalDate routeDate;

    private String memo;
}
