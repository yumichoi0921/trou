package com.b203.trou.repository.restaurant;

import com.b203.trou.entity.restaurant.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findFirst100ByAddressContainingOrderByLatitude(String keyword);
}
