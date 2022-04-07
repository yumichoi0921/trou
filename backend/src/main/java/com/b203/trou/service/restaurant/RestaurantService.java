package com.b203.trou.service.restaurant;

import com.b203.trou.entity.restaurant.Restaurant;
import com.b203.trou.model.restaurant.RestaurantDto;
import com.b203.trou.repository.restaurant.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public List<RestaurantDto> searchRestaurant(String keyword) {
        List<Restaurant> restaurants = restaurantRepository.findFirst100ByNameContainingOrderByLatitude(keyword);
        return restaurants.stream().map(RestaurantDto::new).collect(Collectors.toList());
    }
}
