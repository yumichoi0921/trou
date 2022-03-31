package com.b203.trou.entity.user;

import com.b203.trou.entity.place.Place;
import com.b203.trou.entity.review.Review;
import com.b203.trou.entity.tag.UserTag;
import com.b203.trou.entity.trip.TripPlan;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Setter
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    private List<TripPlan> tripPlans = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserHistory> histories = new ArrayList<>();

    public User(String email, String password, String userName) {
        this.email = email;
        this.password = password;
        this.userName = userName;
    }

}
