package com.b203.trou.entity.trip;

import com.b203.trou.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
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
}
