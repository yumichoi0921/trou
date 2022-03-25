package com.b203.trou.entity.user;

import com.b203.trou.entity.review.Review;
import com.b203.trou.entity.tag.UserTag;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class User {

    @Id
    @GeneratedValue
    @Column(name = "userId")
    private Long id;

    private String email;
    private String password;
    private String userName;

    @OneToOne(mappedBy = "user")
    private OAuth oAuth;

    @OneToMany(mappedBy = "user")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserTag> tags = new ArrayList<>();
}
