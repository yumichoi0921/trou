package com.b203.trou.entity.trip;

import com.b203.trou.entity.place.Place;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class TripOrder {

    @Id
    @GeneratedValue
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
