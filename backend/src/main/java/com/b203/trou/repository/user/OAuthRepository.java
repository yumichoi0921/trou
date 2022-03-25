package com.b203.trou.repository.user;

import com.b203.trou.entity.user.OAuth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OAuthRepository extends JpaRepository<OAuth, Long> {
}
