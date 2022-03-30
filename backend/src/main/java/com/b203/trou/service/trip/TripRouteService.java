package com.b203.trou.service.trip;

import com.b203.trou.repository.trip.TripRouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TripRouteService {
    private final TripRouteRepository tripRouteRepository;
}
