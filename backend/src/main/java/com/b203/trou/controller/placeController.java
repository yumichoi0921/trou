package com.b203.trou.controller;

import com.b203.trou.entity.review.Score;
import com.b203.trou.model.place.PlaceDto;
import com.b203.trou.model.review.ReviewDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class placeController {

   @GetMapping("/place")
    public ResponseEntity<?> selectPlaces(String input ){
//       ReviewDto review1 = new ReviewDto("userName", "너무 좋아요", Score.FOUR);
//       ReviewDto review2 = new ReviewDto("userName", "너무 좋아요", Score.FOUR);
//       ReviewDto review3 = new ReviewDto("userName", "너무 좋아요", Score.FOUR);
//
//       PlaceDto place = new PlaceDto(List.of(review1, review2, review3), "한라산", "http://tong.visitkorea.or.kr/cms/resource/83/1070183_image2_1.jpg");


       return ResponseEntity.ok().build();

   }


}
