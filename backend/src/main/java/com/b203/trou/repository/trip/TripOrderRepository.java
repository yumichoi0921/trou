package com.b203.trou.repository.trip;

import com.b203.trou.entity.trip.TripOrder;
import com.b203.trou.entity.trip.TripPlan;
import com.b203.trou.entity.trip.TripRoute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripOrderRepository extends JpaRepository<TripOrder, Long> {
    List<TripOrder> findByTripRoute(TripRoute tripRoute);
}
