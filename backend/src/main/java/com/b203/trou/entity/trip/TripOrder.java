package com.b203.trou.entity.trip;

import com.b203.trou.entity.place.Place;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalTime;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
@Setter
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

    @DateTimeFormat(pattern = "kk:mm")
    private LocalTime startTime;
    @DateTimeFormat(pattern = "kk:mm")
    private LocalTime endTime;

    public TripOrder(TripRoute tripRoute, Place place, int tripOrder, LocalTime startTime, LocalTime endTime) {
        this.tripRoute = tripRoute;
        this.place = place;
        this.tripOrder = tripOrder;
        this.startTime = startTime;
        this.endTime = endTime;
    }


}
