package com.b203.trou.controller;

import com.b203.trou.model.user.ShareDto;
import com.b203.trou.service.user.ShareService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/share")
@CrossOrigin(origins = "*")
public class ShareController {

    private final ShareService shareService;

    @GetMapping("/{planId}/{userId}")
    public ResponseEntity<?> selectShare(@PathVariable long planId, @PathVariable long userId){
        ShareDto shareInfo = shareService.getShareInfo(planId,userId);
        return ResponseEntity.ok(shareInfo);
    }
}
