package com.b203.trou.model.user;

import com.b203.trou.entity.user.User;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private long userId;
    private String email;
    private  String userName;
    private  String passWord;

    public UserDto(User user) {
        this.userId = user.getId();
        this.email = user.getEmail();
        this.userName = user.getUserName();
    }
}
