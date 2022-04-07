package com.b203.trou.controller;

import com.b203.trou.model.trip.TripPlanDto;
import com.b203.trou.model.user.ShareDto;
import com.b203.trou.service.trip.TripPlanService;
import com.b203.trou.service.user.ShareService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/plan")
@CrossOrigin(origins = "*")
public class TripPlanController {

    private final TripPlanService tripPlanService;
    private final ShareService shareService;

    @GetMapping(value = "/{userId}")
    public ResponseEntity<?> getAllTripPlans(@PathVariable("userId") long userId) {
        try {
            List<TripPlanDto> tripPlans = tripPlanService.getTripPlans(userId);
            return ResponseEntity.ok(tripPlans);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping(value = "/{userId}")
    public ResponseEntity<?> createTripPlan(@RequestBody TripPlanDto tripPlanDto, @PathVariable("userId") long userId) {
        try {
            TripPlanDto result = tripPlanService.createTripPlan(tripPlanDto, userId);
            ShareDto share = shareService.createShare(ShareDto.builder()
                    .userId(userId)
                    .planId(tripPlanDto.getPlanId())
                    .build());
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PatchMapping(value = "/{planId}")
    public ResponseEntity<?> modifyTripPlan(@RequestBody TripPlanDto tripPlanDto, @PathVariable("planId") long planId) {
        try {
            TripPlanDto result = tripPlanService.modifyTripPlan(tripPlanDto, planId);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping(value = "/{planId}")
    public ResponseEntity<?> deleteTripPlan(@PathVariable("planId") long planId) {
        try {
            TripPlanDto result = tripPlanService.deleteTripPlan(planId);
            return ResponseEntity.ok("계획이 삭제되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
