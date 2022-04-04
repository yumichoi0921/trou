package com.b203.trou.controller;


import com.b203.trou.model.user.UserDto;
import com.b203.trou.model.user.UserJoinDto;
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
@RequestMapping("/users")
@Api(value = "User 컨트롤러 API")
public class UserController {

    @Autowired
    UserService userService;

    @ApiOperation(value = "registerInfo", notes = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody UserJoinDto userjoindto) {
        userService.createUser(userjoindto);
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

    @GetMapping("/info/{userEmail}")
    public ResponseEntity<?> getUserInfoByEmail(@PathVariable String userEmail){
        System.out.println(userEmail);
        UserDto userDto = userService.getUserInfoByEmail(userEmail);
        return ResponseEntity.ok(userDto);
    }
}
