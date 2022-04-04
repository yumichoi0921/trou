package com.b203.trou.jwt;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 유효한 자격증명 업이 접근하려할때 401를 리턴할 클래스
//AuthenticationEntryPoint-> 인증과정에서 실패하면 401을 응답하는데 처리해 주는 인터페이스
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    // 에러가 발생하면 실행되는 메소드
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        //401 에러
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);

    }

}
