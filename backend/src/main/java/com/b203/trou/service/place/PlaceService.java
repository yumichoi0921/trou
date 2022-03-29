package com.b203.trou.service.place;

import com.b203.trou.entity.tag.PlaceTag;
import com.b203.trou.entity.tag.Tag;
import com.b203.trou.model.place.PlaceDto;
import com.b203.trou.repository.place.PlaceRepository;
import com.b203.trou.repository.tag.PlaceTagRepository;
import com.b203.trou.repository.tag.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PlaceService {

    private final PlaceRepository placeRepository;
    private final TagRepository tagRepository;
    private final PlaceTagRepository placeTagRepository;
    public List<PlaceDto> getPlaces(String keyword) { // 여행지의 태그, 여행지의 이름

        List<Tag> tags = tagRepository.findByTagNameLike(keyword);
        List<PlaceTag> placeTags=new ArrayList<>();
        for (Tag tag : tags) {
           placeTags.addAll(placeTagRepository.findByTag(tag));

        }
        List<PlaceDto> result = placeTags.stream().map(p -> new PlaceDto(p.getPlace())).collect(Collectors.toList());

        if(!result.isEmpty()){
            return result;
        }


         result= placeRepository.findByPlaceNameContaining(keyword);

        return Optional.of(result).orElseThrow(() -> new IllegalArgumentException("검색 결과가 없습니다."));




        }




    }


    
    

