package com.b203.trou.service.trip;

import com.b203.trou.model.trip.TripOrderDto;
import com.b203.trou.repository.trip.TripOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TripOrderService {

    private final TripOrderRepository tripOrderRepository;

    public List<TripOrderDto> getAllTripOrder(long routeId) {

        return tripOrderRepository.findByRouteId(routeId).stream().map();
    }
}
