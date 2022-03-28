package com.b203.trou.service.tag;

import com.b203.trou.model.tag.TagDto;
import com.b203.trou.repository.tag.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {
    @Autowired
    private TagRepository tagRepository;

    public List<TagDto> getTags() {
        return tagRepository.findAll().stream().map(TagDto::new).collect(Collectors.toList());
    }
}
