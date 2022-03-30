package com.b203.trou.service.tag;

import com.b203.trou.entity.tag.Tag;
import com.b203.trou.entity.tag.UserTag;
import com.b203.trou.entity.user.User;
import com.b203.trou.model.tag.TagDto;
import com.b203.trou.model.tag.UserTagDto;
import com.b203.trou.repository.tag.TagRepository;
import com.b203.trou.repository.tag.UserTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static java.lang.Integer.SIZE;

@RequiredArgsConstructor

@Service
public class TagService {
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private UserTagRepository usertagrepository;


    public List<TagDto> getTags() {
        return tagRepository.findAll().stream().map(TagDto::new).collect(Collectors.toList());
    }


}
