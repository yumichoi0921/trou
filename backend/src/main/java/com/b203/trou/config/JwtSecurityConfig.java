package com.b203.trou.config;

import com.b203.trou.jwt.JwtFilter;
import com.b203.trou.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


//provider, jwtFilter를 securityConfig에 적용할 JwtSecurityConfig
@RequiredArgsConstructor
public class JwtSecurityConfig  extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private final TokenProvider tokenProvider;

    //configure를 재정의해 jwtFilter를 통해 security로직에 필터를 등록
    @Override
    public void configure(HttpSecurity builder) throws Exception {
        JwtFilter filter = new JwtFilter(tokenProvider);
        // JwtFiler 를 security 로직에 적용
        //커스텀 필터와, authenticationFilter를 추가하여, 커스텀 필터 인증 처리가 되면 자연스럽게 로직을 통과.
        builder.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
    }
}

