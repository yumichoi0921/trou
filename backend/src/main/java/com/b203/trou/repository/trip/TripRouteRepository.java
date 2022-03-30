package com.b203.trou.repository.trip;

import com.b203.trou.entity.trip.TripRoute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripRouteRepository extends JpaRepository<TripRoute, Long> {
    List<TripRoute> findByTripPlanId(long tripPlanId);
}
