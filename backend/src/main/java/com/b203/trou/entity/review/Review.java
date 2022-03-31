package com.b203.trou.entity.review;

import com.b203.trou.entity.BaseEntity;
import com.b203.trou.entity.place.Place;
import com.b203.trou.entity.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
@Setter
public class Review extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviewId")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "placeId")
    private Place place;

    private String content;

    private int score;


    public Review(User user, Place place, String content, int score) {
        this.user = user;
        this.place = place;
        this.content = content;
        this.score = score;
    }
    // 리뷰가 추가될 떄
    // 유저가 가진 리뷰 리스트에도 리뷰 추가
    public void setUser(User user) {
        this.user = user;
        user.getReviews().add(this);
    }
    // 장소가 가진 리뷰 리스트에도 리뷰 추가
    public void setPlace(Place place) {
        this.place = place;
        place.getReviews().add(this);
    }
}
