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

    @GetMapping(value = "/place/{placeId}")
    public ResponseEntity<?> getAllPlaceReviews(@PathVariable("placeId") long placeId) {
        try {
            List<ReviewDto> reviews = reviewService.getPlaceReviews(placeId);
            return ResponseEntity.ok(reviews);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping(value = "/user/{userId}")
    public ResponseEntity<?> getAllUserReviews(@PathVariable("userId") long userId) {
        try {
            List<ReviewDto> reviews = reviewService.getUserReviews(userId);
            return ResponseEntity.ok(reviews);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping(value = "/place/{placeId}/user/{userId}")
    public ResponseEntity<?> createReview(@RequestBody ReviewDto reviewDto, @PathVariable("placeId") long placeId, @PathVariable("userId") long userId) {
        try {
            ReviewDto result = reviewService.createReview(reviewDto, placeId, userId);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PatchMapping(value = "/{reviewId}")
    public ResponseEntity<?> modifyReview(@RequestBody ReviewDto reviewDto, @PathVariable("reviewId") long reviewId) {
        try {
            ReviewDto result = reviewService.modifyReview(reviewDto, reviewId);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping(value = "/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable("reviewId") long reviewId) {
        try {
            ReviewDto result = reviewService.deleteReview(reviewId);
            return ResponseEntity.ok("리뷰가 삭제되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

};
