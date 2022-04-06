package com.b203.trou.model.restaurant;

import com.b203.trou.entity.restaurant.Restaurant;
import lombok.Data;

@Data
public class RestaurantDto {
    Long id;
    String name;
    String area;
    String tel;
    String address;
    Float latitude;
    Float longitude;

    public RestaurantDto(Restaurant restaurant) {
        this.id = restaurant.getId();
        this.name = restaurant.getName();
        this.area = restaurant.getArea();
        this.tel = restaurant.getTel();
        this.address = restaurant.getAddress();
        this.latitude = restaurant.getLatitude();
        this.longitude = restaurant.getLongitude();
    }
}
