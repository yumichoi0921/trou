package com.b203.trou.model.user;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserJoinDto {
    String email;
    String password;
    String userName;

}
