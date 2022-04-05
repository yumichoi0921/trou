package com.b203.trou.controller;

import com.b203.trou.model.restaurant.RestaurantDto;
import com.b203.trou.service.restaurant.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping("/restaurant/{keyword}")
    public ResponseEntity<?> searchRestaurant(@PathVariable("keyword") String keyword) {
        try {
            List<RestaurantDto> restaurantDtos = restaurantService.searchRestaurant(keyword);
            return ResponseEntity.ok(restaurantDtos);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
