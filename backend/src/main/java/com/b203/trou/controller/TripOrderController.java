package com.b203.trou.controller;

import com.b203.trou.entity.trip.TripOrder;
import com.b203.trou.model.trip.TripOrderDto;
import com.b203.trou.service.trip.TripOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
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

    @GetMapping("/placeId/{placeName}")
    public ResponseEntity<?> getCourse(@PathVariable ("placeName") String placeName){
        RestTemplate restTemplate = new RestTemplate();

        String baseUrl = "http://127.0.0.1:8000/recommand/user/{placeName}";

        HttpHeaders headers    = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        HttpEntity request = new HttpEntity(headers);
        String[] res=restTemplate.getForObject(baseUrl, String[].class,placeName);


        try{
            List<List<TripOrderDto>> result = new ArrayList<>();
            for(int j=0;j<res.length;j++){

                List<List<TripOrderDto>> course=  tripOrderService.getRoutsByPlaceName(res[j]);
            System.out.println("이름"+res[j]);
            for(int k=0;k<course.size();k++){
                result.add(course.get(k));
            }
            for(int i=0;i<result.size();i++) {
                System.out.print(result.get(i)+" ");
            }
            }
            return ResponseEntity.ok(result);
        }catch (IllegalStateException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
