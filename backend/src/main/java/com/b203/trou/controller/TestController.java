package com.b203.trou.controller;

import com.b203.trou.entity.restaurant.Restaurant;
import com.b203.trou.parsing.DataModel;
import com.b203.trou.repository.restaurant.RestaurantRepository;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.jni.Time;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.Reader;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final RestaurantRepository restaurantRepository;

    @GetMapping("/ip")
    public String Ip () {
        // 요청을 보낸 클라이언트의 IP주소를 반환합니다.
        return "123";
    }

    @GetMapping("parse-data")
    public void parseData() throws FileNotFoundException {
        String path = (new File("")).getAbsolutePath();
        Reader reader = new FileReader("C:\\Users\\enjay27\\ssafy02\\project-sub2\\backend\\data\\data.json");
        Gson gson = new Gson();
        DataModel[] dataModels = gson.fromJson(reader, DataModel[].class);
        List<Restaurant> restaurants = Arrays.stream(dataModels).filter(r -> r.getLatitude() != null && r.getLongitude() != null).filter(r -> r.getLatitude() < 33.7 && r.getLatitude() > 33).map(Restaurant::new).collect(Collectors.toList());
        System.out.println("Start " + LocalDateTime.now());
        List<Restaurant> restaurantsBlob = new ArrayList<>();
        for (Restaurant restaurant : restaurants) {
//            if (restaurant.getLatitude() == null || restaurant.getLongitude() == null) continue;
//            if (restaurant.getLatitude() < 33.7 && restaurant.getLatitude() > 33)
                restaurantsBlob.add(restaurant);
            if (restaurantsBlob.size() == 1000) {
                restaurantRepository.saveAll(restaurantsBlob);
                restaurantsBlob.clear();
                System.out.println("saved 1000");
            }
        }
        restaurantRepository.saveAll(restaurantsBlob);
        System.out.println("Finished " + LocalDateTime.now());
    }
}
