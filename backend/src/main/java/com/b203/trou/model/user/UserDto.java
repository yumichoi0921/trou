package com.b203.trou.model.user;

import com.b203.trou.entity.user.User;
import com.b203.trou.model.review.ReviewDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserDto {
    long userId;
    String email;
    String password;
    String name;

    List<ReviewDto> reviews;



    public UserDto(User user) {
        this.userId = user.getId();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.name = user.getName();
        this.reviews = user.getReviews().stream().map(ReviewDto::new).collect(Collectors.toList());
    }
}
