package com.b203.trou.entity.place;

import com.b203.trou.entity.BaseEntity;
import com.b203.trou.entity.review.Review;
import lombok.Getter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Place extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "placeId")
    private Long id;
    private String addr1;
    private String adde2;
    private String areaCode;
    private String cat3;
    private String contentTypeId;
    private String firstImage;
    private String firstImage2;
    private BigDecimal mapX;
    private BigDecimal mapY;

    private int mLevel;
    private int readCount;
    private String sigunguCode;
    private String tel;
    private String placeName;
    private String eventStartDate;
    private String eventEndDate;
    private String overview;

    @OneToMany(mappedBy = "place")
    private List<Review> reviews = new ArrayList<>();
}
