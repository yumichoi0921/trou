package com.b203.trou.controller;
import com.b203.trou.model.place.PlaceDto;
import com.b203.trou.service.place.PlaceService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequiredArgsConstructor
@RestController
@RequestMapping("/place")
@CrossOrigin(origins = "http://localhost:3000")
public class PlaceController {

   private final PlaceService placeService;

   @GetMapping("/{keyword}")
    public ResponseEntity<?> selectPlaces(@PathVariable("keyword") String keyword ){

         List<PlaceDto> places = placeService.getPlaces(keyword);

       return ResponseEntity.ok(places);


   }
//
//   @GetMapping("/recommand/{userId}")
//    public ResponseEntity<?>recommandPlaces(@PathVariable("userId") String userId){
//
//        List<PlaceDto> userHistoryPlaces = placeService.getPlacesByUserId(userId);
//
//   }



}
