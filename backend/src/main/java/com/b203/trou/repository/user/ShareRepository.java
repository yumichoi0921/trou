package com.b203.trou.repository.user;

import com.b203.trou.entity.user.Share;
import com.b203.trou.model.user.ShareDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShareRepository extends JpaRepository<Share, Long> {
    Optional<Share> findByTripPlanIdAndUserId(long planId, long userId);
}
