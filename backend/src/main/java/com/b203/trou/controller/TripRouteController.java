package com.b203.trou.controller;

import com.b203.trou.model.trip.TripPlanDto;
import com.b203.trou.model.trip.TripRouteDto;
import com.b203.trou.service.trip.TripRouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/route")
public class TripRouteController {
    private final TripRouteService tripRouteService;

    @GetMapping(value = "/{planId}")
    public ResponseEntity<?> getAllTripRoutes(@PathVariable("planId") long planId) {
        try {
            List<TripRouteDto> tripRoutes = tripRouteService.getAllTripRoute(planId);
            return ResponseEntity.ok(tripRoutes);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping(value = "/{planId}")
    public ResponseEntity<?> createTripRoute(@RequestBody TripRouteDto tripRouteDto, @PathVariable("planId") long planId) {
        try {
            TripRouteDto result = tripRouteService.createTripRoute(tripRouteDto, planId);
            return ResponseEntity.ok(result);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PatchMapping(value = "/{routeId}")
    public ResponseEntity<?> modifyTripRoute(@RequestBody TripRouteDto tripRouteDto, @PathVariable("routeId") long routeId) {
        try {
            TripRouteDto result = tripRouteService.modifyTripRoute(tripRouteDto, routeId);
            return ResponseEntity.ok(result);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping(value = "/{routeId}")
    public ResponseEntity<?> deleteTripRoute(@PathVariable("routeId") long routeId) {
        try {
            TripRouteDto result = tripRouteService.deleteTripRoute(routeId);
            return ResponseEntity.ok("트립 루트가 삭제되었습니다.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
