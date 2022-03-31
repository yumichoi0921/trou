package com.b203.trou.controller;

import com.b203.trou.entity.trip.TripOrder;
import com.b203.trou.entity.trip.TripRoute;
import com.b203.trou.model.trip.TripOrderDto;
import com.b203.trou.model.trip.TripRouteDto;
import com.b203.trou.service.trip.TripOrderService;
import com.b203.trou.service.trip.TripRouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/order")
public class TripOrderController {
    private final TripRouteService tripRouteService;
    private final TripOrderService tripOrderService;

    @GetMapping(value = "/{routeId}")
    public ResponseEntity<?> getAllTripRoutes(@PathVariable long routeId) {
        try {
            List<TripOrderDto> tripOrders = tripOrderService.getAllTripOrder(routeId);
            return ResponseEntity.ok(tripOrders);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping(value = "/{tripPlanId}")
    public ResponseEntity<?> createTripRoute(@RequestBody TripRouteDto tripRouteDto, @PathVariable("tripPlanId") long tripPlanId) {
        try {
            TripRouteDto result = tripRouteService.createTripRoute(tripRouteDto, tripPlanId);
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
