package com.b203.trou.model.user;

import com.b203.trou.entity.tag.Tag;
import com.b203.trou.entity.tag.UserTag;
import com.b203.trou.entity.user.User;
import com.b203.trou.model.place.PlaceDto;
import com.b203.trou.model.review.ReviewDto;
import com.b203.trou.model.tag.TagDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {
    long userId;
    String email;
    String password;
    String userName;

    List<ReviewDto> reviews;

    public UserDto(User user) {
        this.userId = user.getId();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.userName = user.getUserName();
        this.reviews = user.getReviews().stream().map(ReviewDto::new).collect(Collectors.toList());
    }
}
