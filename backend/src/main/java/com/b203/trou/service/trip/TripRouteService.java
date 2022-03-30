package com.b203.trou.service.trip;

import com.b203.trou.entity.trip.TripRoute;
import com.b203.trou.model.trip.TripPlanDto;
import com.b203.trou.model.trip.TripRouteDto;
import com.b203.trou.repository.trip.TripRouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TripRouteService {
    private final TripRouteRepository tripRouteRepository;

    public List<TripRouteDto> getTripRoutes(long tripPlanId) {
        List<TripRoute> tripRoute = tripRouteRepository.findByTripPlanId(tripPlanId);
        List<TripRouteDto> result = new ArrayList<>();
        for (TripRoute route : tripRoute) {
            TripRouteDto tripPlanDto = TripRouteDto.builder()
                    .routeId(route.getId())
                    .routeDate(route.getRouteDate())
                    .memo(route.getMemo())
                    .build();
            result.add(tripPlanDto);
        }
        return result;
    }
}
