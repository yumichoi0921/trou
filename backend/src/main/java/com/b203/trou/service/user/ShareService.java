package com.b203.trou.service.user;

import com.b203.trou.entity.user.Share;
import com.b203.trou.model.user.ShareDto;
import com.b203.trou.repository.user.ShareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShareService {
    private final ShareRepository shareRepository;

    public ShareDto getShareInfo(long planId, long userId) {
        Share shareInfo = shareRepository.findByTripPlanIdAndUserId(planId,userId).orElseThrow(() -> new IllegalArgumentException("해당하는 공유 정보가 없습니다."));

        return ShareDto.builder()
                .shareId(shareInfo.getId())
                .build();
    }
}
