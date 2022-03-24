package com.b203.trou.entity.trip;

import com.b203.trou.entity.BaseEntity;
import lombok.Getter;

import javax.persistence.*;
import java.sql.Timestamp;

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

    private Timestamp routeDate;

    private String memo;
}
