package com.b203.trou.controller;


import com.b203.trou.entity.tag.Tag;
import com.b203.trou.model.tag.TagDto;
import com.b203.trou.service.tag.TagService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/tag")
public class UserTagController {

    private final TagService tagservice;

@PostMapping("/{userId}")
    public ResponseEntity<?> selectTag(@RequestBody List<TagDto> TagList , @PathVariable("userId")long userId){

    return ResponseEntity.ok(TagList);
}

}
