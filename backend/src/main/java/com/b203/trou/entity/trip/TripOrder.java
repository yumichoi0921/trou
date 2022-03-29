package com.b203.trou.entity.trip;

import com.b203.trou.entity.place.Place;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class TripOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderId")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routeId")
    private TripRoute tripRoute;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "placeId")
    private Place place;

    private int tripOrder;

    private Timestamp startTime;

    private Timestamp endTime;
}
