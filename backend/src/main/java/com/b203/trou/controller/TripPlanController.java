package com.b203.trou.controller;

import com.b203.trou.model.trip.TripPlanDto;
import com.b203.trou.service.trip.TripPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/plan")
public class TripPlanController {

    private final TripPlanService tripPlanService;

    @GetMapping(value = "/{userId}")
    public ResponseEntity<?> getAllTripPlans() {
        try {
            List<TripPlanDto> tripPlans = tripPlanService.getTripPlans();
            return ResponseEntity.ok(tripPlans);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).build();
        }
    }

    @PostMapping(value = "/user/{userId]")
    public ResponseEntity<?> createTripPlan(@RequestBody TripPlanDto tripPlan, @PathVariable("userId") String userId) {
        try {
            TripPlanDto result = tripPlanService.createTripPlan(tripPlan, userId);
            return ResponseEntity.ok(result);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

    }
}
