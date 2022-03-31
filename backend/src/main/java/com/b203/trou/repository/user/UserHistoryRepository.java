package com.b203.trou.repository.user;

import com.b203.trou.entity.tag.UserTag;
import com.b203.trou.entity.user.User;
import com.b203.trou.entity.user.UserHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserHistoryRepository extends JpaRepository<UserHistory, Long> {


    Optional<UserHistory> findByUser(User user);
}
