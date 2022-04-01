package com.b203.trou.controller;

import com.b203.trou.model.trip.TripOrderDto;
import com.b203.trou.service.trip.TripOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "*")
public class TripOrderController {

    private final TripOrderService tripOrderService;

    @GetMapping(value = "/{routeId}")
    public ResponseEntity<?> getTripOrder(@PathVariable("routeId") long routeId) {
        try {
            List<TripOrderDto> tripOrders = tripOrderService.getTripOrder(routeId);
            return ResponseEntity.ok(tripOrders);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping(value = "/{routeId}")
    public ResponseEntity<?> createTripOrder(@RequestBody List<TripOrderDto> tripOrderDtos, @PathVariable("routeId") long routeId) {
        try {
            List<TripOrderDto> result = tripOrderService.createTripOrder(tripOrderDtos, routeId);
            return ResponseEntity.ok(result);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PatchMapping(value = "/{orderId}")
    public ResponseEntity<?> modifyTripOrder(@RequestBody TripOrderDto tripOrderDto, @PathVariable("orderId") long orderId) {
        try {
            TripOrderDto result = tripOrderService.modifyTripOrder(tripOrderDto, orderId);
            return ResponseEntity.ok(result);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping(value = "/{orderId}")
    public ResponseEntity<?> deleteTripOrder(@PathVariable("orderId") long orderId) {
        try {
            TripOrderDto result = tripOrderService.deleteTripOrder(orderId);
            return ResponseEntity.ok("트립 오더가 삭제되었습니다.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
