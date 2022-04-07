package com.b203.trou.entity.place;

import com.b203.trou.entity.BaseEntity;
import com.b203.trou.entity.review.Review;
import com.b203.trou.entity.tag.PlaceTag;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@NoArgsConstructor
@Entity
@Getter
@Setter
public class Place extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "placeId")
    private Long id;
    private String addr1;
    private String addr2;
    private String areaCode;
    private String cat3;
    private String contentTypeId;
    private String firstImage;
    private String firstImage2;
    private double mapX;
    private double mapY;
    private int readCount;
    private String sigunguCode;
    private String tel;
    private String placeName;
    private LocalDate eventStartDate;
    private LocalDate eventEndDate;
    private String overview;

    @OneToMany(mappedBy = "place")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "place")
    private List<PlaceTag> tags = new ArrayList<>();
}
