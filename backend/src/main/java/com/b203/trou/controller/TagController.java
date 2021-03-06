package com.b203.trou.controller;

import com.b203.trou.model.tag.TagDto;
import com.b203.trou.repository.tag.TagRepository;
import com.b203.trou.service.tag.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/tag")
@CrossOrigin(origins = "http://localhost:3000")
public class TagController {

    private final TagService tagService;

    @GetMapping
    public ResponseEntity<?> getAllTags() {
        try {
            List<TagDto> tags = tagService.getTags();
            return ResponseEntity.status(200).body(tags);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).build();
        }
    }
}
