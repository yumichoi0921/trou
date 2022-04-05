package com.b203.trou.service.user;

import com.b203.trou.entity.trip.TripPlan;
import com.b203.trou.entity.user.Share;
import com.b203.trou.entity.user.User;
import com.b203.trou.model.user.ShareDto;
import com.b203.trou.model.user.UserDto;
import com.b203.trou.repository.trip.TripPlanRepository;
import com.b203.trou.repository.user.ShareRepository;
import com.b203.trou.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShareService {
    private final ShareRepository shareRepository;
    private final TripPlanRepository tripPlanRepository;
    private final UserRepository userRepository;

//    public ShareDto getShareInfo(long planId, long userId) {
//        Share shareInfo = shareRepository.findByTripPlanIdAndUserId(planId,userId).orElseThrow(() -> new IllegalArgumentException("해당하는 공유 정보가 없습니다."));
//
//        return ShareDto.builder()
//                .shareId(shareInfo.getId())
//                .build();
//    }

    @Transactional
    public ShareDto createShare(ShareDto shareInfo) {
        User user = userRepository.findById(shareInfo.getUserId()).orElseThrow(() -> new IllegalArgumentException("해당하는 유저가 없습니다."));
        TripPlan tripPlan = tripPlanRepository.findById(shareInfo.getPlanId()).orElseThrow(() -> new IllegalArgumentException("해당하는 플랜이 없습니다."));
        Share share = Share.builder()
                .tripPlan(tripPlan)
                .user(user)
                .build();
        shareRepository.save(share);
        return ShareDto.builder()
                .planId(shareInfo.getPlanId())
                .userId(shareInfo.getUserId())
                .build();
    }

    public List<UserDto> getUserFromShare(long planId) {
        List<Share> shares = shareRepository.findByTripPlanId(planId).orElseThrow(() -> new IllegalArgumentException("해당하는 정보가 없습니다."));;
        List<UserDto> userDtos = shares.stream().map(share -> UserDto.builder()
                .userId(share.getUser().getId())
                .name(share.getUser().getName())
                .email(share.getUser().getEmail())
                .build())
                .collect(Collectors.toList());
        return userDtos;
    }
}
