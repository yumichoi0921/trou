package com.b203.trou.controller;

import com.b203.trou.model.trip.TripPlanDto;
import com.b203.trou.service.trip.TripRouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TripRouteController {

    private final TripRouteService tripRouteService;

    // 조회
//    @GetMapping(value = "/{planId}")
//    public ResponseEntity<?> getAllTripRoutes(@PathVariable long planId) {
//        try {
//            List<TripPlanDto> tripPlans = tripPlanService.getTripPlans(userId);
//            return ResponseEntity.ok(tripPlans);
//        } catch (IllegalStateException e) {
//            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).build();
//        }
//    }

    // 생성(planId, routeDate, memo)

    // 수정(routeId, memo,
}
