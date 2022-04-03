package com.b203.trou.controller;


import com.b203.trou.model.user.UserDto;
import com.b203.trou.service.user.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.sasl.AuthenticationException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@Api(value = "User 컨트롤러 API")
public class UserController {

    @Autowired
    UserService userService;

    @ApiOperation(value = "registerInfo", notes = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody UserDto userdto) {
        userService.createUser(userdto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody UserDto userdto){
        try {
            UserDto userDto = userService.signInUser(userdto);
            return ResponseEntity.ok(userDto);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @ApiOperation(value = "getEmails", notes = "회원 이메일 가져오기")
    @GetMapping("/{email}")
    public ResponseEntity<?> getEmails(@PathVariable String email){
        List<UserDto> emails = userService.getEmails(email);
        return ResponseEntity.ok(emails);
    }
}
