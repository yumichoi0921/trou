package com.b203.trou.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class TestController {

    @GetMapping("/ip")
    public String Ip () {
        // 요청을 보낸 클라이언트의 IP주소를 반환합니다.
        return "123";
    }
}
