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
public class placeController {

   private final PlaceService placeService;

   @GetMapping("/{keyword}")
    public ResponseEntity<?> selectPlaces(@PathVariable("keyword") String keyword ){

         List<PlaceDto> places = placeService.getPlaces(keyword);

//
//       ReviewDto review1 = new ReviewDto("userName", "너무 좋아요", Score.FOUR);
//       ReviewDto review2 = new ReviewDto("userName", "너무 좋아요", Score.FOUR);
//       ReviewDto review3 = new ReviewDto("userName", "너무 좋아요", Score.FOUR);
//
//       PlaceDto place = new PlaceDto(List.of(review1, review2, review3), "한라산", "http://tong.visitkorea.or.kr/cms/resource/83/1070183_image2_1.jpg");
//       PlaceDto place2 = new PlaceDto(List.of(review1, review2, review3), "한라산", "http://tong.visitkorea.or.kr/cms/resource/83/1070183_image2_1.jpg");
//       PlaceDto place3 = new PlaceDto(List.of(review1, review2, review3), "한라산", "http://tong.visitkorea.or.kr/cms/resource/83/1070183_image2_1.jpg");
//       List<PlaceDto> places = new ArrayList<>(List.of(place,place2,place3));

       return ResponseEntity.ok(places);


   }


}
