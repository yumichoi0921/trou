package com.b203.trou.repository.user;

import com.b203.trou.entity.user.User;
import com.b203.trou.entity.user.UserHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserHistoryRepository extends JpaRepository<UserHistory, Long> {


    List<UserHistory> findByUser(User user);

    boolean existsByUserId(long userId);


}
