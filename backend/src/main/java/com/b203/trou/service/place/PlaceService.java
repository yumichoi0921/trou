package com.b203.trou.service.place;

import com.b203.trou.entity.place.Place;
import com.b203.trou.entity.tag.PlaceTag;
import com.b203.trou.entity.tag.Tag;
import com.b203.trou.entity.user.User;
import com.b203.trou.entity.user.UserHistory;
import com.b203.trou.model.place.PlaceDto;
import com.b203.trou.model.user.UserHistoryDto;
import com.b203.trou.repository.place.PlaceRepository;
import com.b203.trou.repository.tag.PlaceTagRepository;
import com.b203.trou.repository.tag.TagRepository;
import com.b203.trou.repository.user.UserHistoryRepository;
import com.b203.trou.repository.user.UserRepository;
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
    private final UserRepository userRepository;
    private final UserHistoryRepository userHistoryRepository;
    public List<PlaceDto> getPlaces(String keyword) { // 여행지의 태그, 여행지의 이름

        List<Tag> tags = tagRepository.findByTagNameLike(keyword);
        List<PlaceTag> placeTags=new ArrayList<>();
        for (Tag tag : tags) {
            placeTags.addAll(placeTagRepository.findByTag(tag));

        }
        List<PlaceDto> result = placeTags.stream().distinct().map(p -> new PlaceDto(p.getPlace())).collect(Collectors.toList());

        if(!result.isEmpty()){
            return result;
        }
        
        result= placeRepository.findByPlaceNameContaining(keyword);

        return Optional.of(result).orElseThrow(() -> new IllegalArgumentException("검색 결과가 없습니다."));
    }



    public List<UserHistoryDto> getHistory(long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new IllegalArgumentException("해당하는 유저가 없습니다."));


        List<UserHistory> userHistory = userHistoryRepository.findByUser(user);
        System.out.println("userHistory: "+userHistory);
        List<UserHistoryDto> userHistoryDtoList = userHistory.stream().map(u -> new UserHistoryDto(u)).collect(Collectors.toList());
        return userHistoryDtoList;

    }

    public String getPlacesById(long placeId) {

        Place place = placeRepository.findById(placeId).orElseThrow(()->new IllegalArgumentException("해당하는 장소가 없습니다."));
        return place.getPlaceName();
    }

    public PlaceDto getPlace(long placeId) {
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new IllegalArgumentException("해당 장소가 없습니다."));
        PlaceDto result = new PlaceDto(place);
//        PlaceDto result = PlaceDto.builder()
//                .placeName(place.getPlaceName())
//                .image(place.getFirstImage())
//                .mapX(place.getMapX())
//                .mapY(place.getMapY())
//                .readCount(place.getReadCount())
//                .averageScore(place.getReviews().stream().mapToDouble(Review::getScore).average().orElse(0.0))
//                .build();
        return result;
    }

    public List<PlaceDto> getTagRelatedPlaces(List<String> tags) {
        List<PlaceDto> places = new ArrayList<>();
        for (String tag : tags) {
            List<Tag> tagList = tagRepository.findByTagNameLike(tag);
            List<PlaceTag> placeTags=new ArrayList<>();
            for (Tag t : tagList) {
                placeTags.addAll(placeTagRepository.findByTag(t));

            }
            places.addAll(placeTags.stream().distinct().map(p -> new PlaceDto(p.getPlace())).collect(Collectors.toList()));
        }
        return places.stream().distinct().collect(Collectors.toList());
    }
}


    
    

