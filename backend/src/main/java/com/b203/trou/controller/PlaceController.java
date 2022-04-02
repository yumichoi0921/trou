package com.b203.trou.controller;
import com.b203.trou.model.place.PlaceDto;
import com.b203.trou.model.place.PlaceRequestDto;
import com.b203.trou.model.place.PlaceResponseDto;
import com.b203.trou.model.user.UserHistoryDto;
import com.b203.trou.service.place.PlaceService;
import com.b203.trou.service.user.UserHistoryService;
import lombok.RequiredArgsConstructor;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/place")
@CrossOrigin(origins = "http://localhost:3000")
public class PlaceController {

   private final PlaceService placeService;
   private final UserHistoryService userHistoryService;
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

       for(int i=0; i < res.length; i++) {
           System.out.println("======== res : " + i + " ========");
           System.out.println(res[i].getPlace_id() + " " + res[i].getPlace_name() + " " + res[i].getTags());
       }




       return ResponseEntity.ok(res);
   }




}
