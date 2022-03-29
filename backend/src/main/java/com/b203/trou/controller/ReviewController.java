package com.b203.trou.controller;

import com.b203.trou.model.review.ReviewDto;
import com.b203.trou.service.review.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("review")
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping(value = "place/{placeId}")
    public ResponseEntity<?> getAllPlaceReviews(@PathVariable("placeId") long placeId) {
        try {
            List<ReviewDto> reviews = reviewService.getPlaceReviews(placeId);
            return ResponseEntity.ok(reviews);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).build();
        }
    }

    @GetMapping(value = "user/{userId}")
    public ResponseEntity<?> getAllUserReviews(@PathVariable("userId") long userId) {
        try {
            List<ReviewDto> reviews = reviewService.getUserReviews(userId);
            return ResponseEntity.ok(reviews);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).build();
        }
    }

    @PostMapping(value = "/place/{placeId}/user/{userId}")
    public ResponseEntity<?> createReview(@RequestBody ReviewDto reviewDto, @PathVariable("placeId") long placeId, @PathVariable("userId") long userId) {
        try {
            ReviewDto result = reviewService.createReview(reviewDto, placeId, userId);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
