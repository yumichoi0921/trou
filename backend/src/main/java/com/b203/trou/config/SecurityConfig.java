package com.b203.trou.config;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

//web보안 활성화
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    @Override
    protected void configure(HttpSecurity http) throws Exception {
//         http.csrf().disable()
//                .authorizeRequests() //예외처리 기능
//                 .and()
//                 .authorizeRequests() // 다음 리퀘스트에 대한 사용권한 체크
//                .antMatchers(HttpMethod.OPTIONS, "/api/*").permitAll() //OPTIONS 메소드 허락 - preflight 요청에 대한 접근 허용
//                .antMatchers("/api/users/signup","/api/users/signin").permitAll() // 가입 및 인증 주소는 누구나 접근가능
//        // .antMatchers(HttpMethod.GET, "//refresh-access-token").permitAll() // 로그인이 유지중이라면 토큰이 만료되는 시점에 리프레쉬 해주는 요청. 추후 기능 추가 시 주석 해제
////			    .anyRequest().hasRole("USER") // 그외 나머지 요청은 모두 인증된 회원만 접근 가능 배포시 주석 해제!
//                 .and()
//                 .anyRequest().authenticated(); //나머지 요청은 모두 인증이 되어야 접근 가능

    }
}
