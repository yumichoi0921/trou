package com.b203.trou.controller;
import com.b203.trou.model.place.PlaceDto;
import com.b203.trou.model.place.PlaceRequestDto;
import com.b203.trou.model.place.PlaceResponseDto;
import com.b203.trou.model.tag.TagDto;
import com.b203.trou.model.user.UserHistoryDto;
import com.b203.trou.service.place.PlaceService;
import com.b203.trou.service.user.UserHistoryService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/place")
@CrossOrigin(origins = "http://localhost:3000")
public class PlaceController {

    private final PlaceService placeService;
    private final UserHistoryService userHistoryService;

    @GetMapping("/detail/{placeId}")
    public ResponseEntity<?> selectPlaces(@PathVariable long placeId ) {
        PlaceDto place = placeService.getPlace(placeId);
        return ResponseEntity.ok(place);
    }

    @GetMapping("/{keyword}")
    public ResponseEntity<?> selectPlaces(@PathVariable("keyword") String keyword ){

        List<PlaceDto> places = placeService.getPlaces(keyword);

        return ResponseEntity.ok(places);


    }

    @GetMapping("/recommand/{userId}")
    public ResponseEntity<?>recommandPlaces(@PathVariable("userId") long userId) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        List<UserHistoryDto> userHistoryPlaces = placeService.getHistory(userId);
        String baseUrl = "http://127.0.0.1:8000/recommand/";

        HttpHeaders headers    = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        HttpEntity request = new HttpEntity(headers);

        List<PlaceRequestDto> places = new ArrayList<>();

        for (UserHistoryDto h: userHistoryPlaces) {
            String placeName = placeService.getPlacesById(h.getPlace().getId());
            places.add(new PlaceRequestDto(placeName));
        }


        PlaceResponseDto[] res=restTemplate.postForObject(baseUrl,places, PlaceResponseDto[].class);

//        for(int i=0; i < res.length; i++) {
//            System.out.println("======== res : " + i + " ========");
//            System.out.println(res[i].getPlace_id() + " " + res[i].getPlace_name() + " " + res[i].getTags());
//        }




        return ResponseEntity.ok(res);
    }

    @PostMapping("/related/tag")
    public ResponseEntity<?> getTagRelatedPlaces(@RequestBody List<TagDto> tags) {
        List<PlaceDto> places = placeService.getTagRelatedPlaces(tags);
        return ResponseEntity.ok(places);
    }

}
