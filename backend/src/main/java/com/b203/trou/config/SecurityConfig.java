package com.b203.trou.config;

import com.b203.trou.jwt.JwtAccessDeniedHandler;
import com.b203.trou.jwt.JwtAuthenticationEntryPoint;
import com.b203.trou.jwt.TokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

//web보안 활성화
@EnableWebSecurity
//@PreAuthorize 어노테이션을 메소드 단위로 추가하기 위함.
@EnableGlobalMethodSecurity(prePostEnabled = true)

public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    public SecurityConfig(TokenProvider tokenProvider, JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, JwtAccessDeniedHandler jwtAccessDeniedHandler) {
        this.tokenProvider = tokenProvider;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //Token 방식을 사용하므로 csrf 설정을 disable
         http.csrf().disable()
                 // 만들어줬던 주입받는 코드
                 .exceptionHandling()
                 .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                 .accessDeniedHandler(jwtAccessDeniedHandler)

                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 하지않음

                 .and()
                 .authorizeRequests()
                 .antMatchers("/users/*").permitAll()
                 .anyRequest().authenticated()

                 .and()
                 .apply(new JwtSecurityConfig(tokenProvider)); // 커스텀하게 작선한 jwtSecurityConfig도 적용


    }
}
