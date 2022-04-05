package com.b203.trou.controller;

import com.b203.trou.model.trip.TripPlanDto;
import com.b203.trou.model.user.ShareDto;
import com.b203.trou.model.user.UserDto;
import com.b203.trou.service.user.ShareService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/share")
@CrossOrigin(origins = "*")
public class ShareController {

    private final ShareService shareService;

    // planId에 해당하는 공유된 친구 목록
    @GetMapping("/{planId}")
    public ResponseEntity<?> getUserFromShare(@PathVariable long planId){
        List<UserDto> userDtos = shareService.getUserFromShare(planId);
        return ResponseEntity.ok(userDtos);
    }

    @PostMapping()
    public ResponseEntity<?> createShare(@RequestBody ShareDto shareInfo){
        try {
            System.out.println(shareInfo.getUserId());
            ShareDto result = shareService.createShare(shareInfo);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
