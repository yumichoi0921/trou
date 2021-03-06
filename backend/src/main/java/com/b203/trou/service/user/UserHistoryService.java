package com.b203.trou.service.user;

import com.b203.trou.entity.place.Place;
import com.b203.trou.entity.user.User;
import com.b203.trou.entity.user.UserHistory;
import com.b203.trou.model.place.PlaceDto;
import com.b203.trou.repository.place.PlaceRepository;
import com.b203.trou.repository.user.UserHistoryRepository;
import com.b203.trou.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserHistoryService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserHistoryRepository userHistoryRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Transactional
    public boolean setUserHistory(List<PlaceDto> placeList, long userId){
        User user = userRepository.findById(userId).orElseThrow(()->new IllegalArgumentException("해당하는 유저가 없습니다."));

        // 받아온 place List 로 UserHistory 객체 생성
        List<Place> places = placeList.stream()
                .map(p -> placeRepository.findById(p.getPlaceId()).orElseThrow(() -> new IllegalArgumentException("해당하는 장소가 없습니다.")))
                .collect(Collectors.toList());

        //user 안에 userHistory 에다가 각각의 place 추가
        List<UserHistory> userHistoryList = places.stream().map(p -> new UserHistory(user, p)).collect(Collectors.toList());

            userHistoryRepository.saveAll(userHistoryList);
        return user.getHistories().addAll(userHistoryList);




    }


    public boolean checkUserPlace(long userId){
       if(userHistoryRepository.existsByUserId(userId)){
           return true;
       }else{
           return false;
       }
    }
}
