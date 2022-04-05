package com.b203.trou.controller;


import com.b203.trou.jwt.JwtFilter;
import com.b203.trou.jwt.TokenProvider;
import com.b203.trou.model.user.UserDto;
import com.b203.trou.model.user.UserJoinDto;
import com.b203.trou.service.user.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.b203.trou.model.user.TokenDto;
import javax.security.sasl.AuthenticationException;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Api(value = "User 컨트롤러 API")
public class UserController {

    @Autowired
    UserService userService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @ApiOperation(value = "registerInfo", notes = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody UserJoinDto userjoindto) {
        userService.createUser(userjoindto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody UserDto userdto) throws AuthenticationException {
        System.out.println(userdto.getEmail()+ userdto.getPassword());
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userdto.getEmail(), userdto.getPassword());
        //유저 정보를 조회하여 인증 정보를 생성
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        //해당 인증 정보를 현재 실행중인 스레드(Security Context)에 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);
        //해당 인증 정보를 기반으로 jwt 토큰을 생성
        String jwt = tokenProvider.createToken(authentication);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        //생성된 Token을 Response Header에 넣고, Token vo 객체를 이용해 Response Body에도 넣어서 리턴
        return new ResponseEntity<>(new TokenDto(jwt, userService.signInUser(userdto)), httpHeaders, HttpStatus.OK);
    }

    @GetMapping("/{userEmail}")
    public ResponseEntity<?> checkEmail(@PathVariable("userEmail") String useremail) throws AuthenticationException {
       try{
           userService.CheckUserEmail(useremail);
           System.out.println("중복됨");
           return ResponseEntity.status(400).build();

       }catch (AuthenticationException e){
           System.out.println("사용 가능");
         return ResponseEntity.status(200).build();

       }

    }
}
