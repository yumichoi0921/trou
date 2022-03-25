package com.b203.trou.entity.review;

import com.b203.trou.entity.BaseEntity;
import com.b203.trou.entity.place.Place;
import com.b203.trou.entity.user.User;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Review extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "reviewId")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "placeId")
    private Place place;

    private String content;

    @Enumerated(EnumType.STRING)
    private Score score;
}
