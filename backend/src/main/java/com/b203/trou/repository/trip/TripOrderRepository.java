package com.b203.trou.repository.trip;

import com.b203.trou.entity.trip.TripOrder;
import com.b203.trou.model.trip.TripOrderDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripOrderRepository extends JpaRepository<TripOrder, Long> {
    List<TripOrderDto> findByRouteId(long routeId);
}
