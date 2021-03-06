package com.b203.trou.service.trip;

import com.b203.trou.entity.trip.TripOrder;
import com.b203.trou.entity.trip.TripPlan;
import com.b203.trou.entity.trip.TripRoute;
import com.b203.trou.model.trip.TripRouteDto;
import com.b203.trou.repository.trip.TripPlanRepository;
import com.b203.trou.repository.trip.TripRouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TripRouteService {

//
//    public List<TripRouteDto> getTripRoutes(long tripPlanId) {
//        List<TripRoute> tripRoute = tripRouteRepository.findByTripPlanId(tripPlanId);
//        List<TripRouteDto> result = new ArrayList<>();
//        for (TripRoute route : tripRoute) {
//            TripRouteDto tripPlanDto = TripRouteDto.builder()
//                    .routeId(route.getId())
//                    .routeDate(route.getRouteDate())
//                    .memo(route.getMemo())
//                    .build();
//            result.add(tripPlanDto);
//        }
//        return result;
//    }
    private final TripRouteRepository tripRouteRepository;
    private final TripPlanRepository tripPlanRepository;

    public List<TripRouteDto> getAllTripRoute(long planId) {
        TripPlan tripPlan = tripPlanRepository.findById(planId).orElseThrow(()->new IllegalArgumentException("해당하는 트립 플랜이 없습니다."));
        List<TripRouteDto> tripRoutes = tripRouteRepository.findByTripPlan(tripPlan).stream().map(TripRouteDto::new).collect(Collectors.toList());
        return tripRoutes;
    }

    @Transactional
    public TripRouteDto createTripRoute(TripRouteDto tripRouteDto, long planId) {
        TripPlan tripPlan = tripPlanRepository.findById(planId).orElseThrow(()->new IllegalArgumentException("해당하는 트립 플랜이 없습니다."));
        TripRoute tripRoute = new TripRoute(tripPlan, tripRouteDto.getRouteDate(), tripRouteDto.getMemo(), tripRouteDto.getDay());
        tripRouteRepository.save(tripRoute);
        return new TripRouteDto(tripRoute);
    }

    @Transactional
    public TripRouteDto modifyTripRoute(TripRouteDto tripRouteDto, long routeId) {
        TripRoute tripRoute = tripRouteRepository.findById(routeId).orElseThrow(()->new IllegalArgumentException("해당하는 트립 루트가 없습니다."));
        tripRoute.setMemo(tripRouteDto.getMemo());
        tripRoute.setRouteDate(tripRouteDto.getRouteDate());
        tripRoute.setDay(tripRouteDto.getDay());
        return new TripRouteDto(tripRoute);
    }

    @Transactional
    public TripRouteDto modifyMemo(TripRouteDto tripRouteDto, long routeId) {
        TripRoute tripRoute = tripRouteRepository.findById(routeId).orElseThrow(()->new IllegalArgumentException("해당하는 트립 루트가 없습니다."));
        tripRoute.setMemo(tripRouteDto.getMemo());
//        tripRouteRepository.save(tripRoute);
        return new TripRouteDto(tripRoute);
    }

    public TripRouteDto deleteTripRoute(long routeId) {
        TripRoute tripRoute = tripRouteRepository.findById(routeId).orElseThrow(()->new IllegalArgumentException("해당하는 트립 루트가 없습니다."));
        tripRouteRepository.delete(tripRoute);
        return new TripRouteDto(tripRoute);
    }


}
