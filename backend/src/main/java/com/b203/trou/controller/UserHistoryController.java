package com.b203.trou.controller;


import com.b203.trou.model.place.PlaceDto;
import com.b203.trou.service.tag.TagService;
import com.b203.trou.service.user.UserHistoryService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/history")
public class UserHistoryController {

    @Autowired
    private UserHistoryService userHistoryService;

    @PostMapping("/{userId}")
    public ResponseEntity<?> savePlace(@RequestBody List<PlaceDto> placeList , @PathVariable("userId")long userId){
        try {
            userHistoryService.setUserHistory(placeList, userId);

            return ResponseEntity.ok().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }


    }



}
