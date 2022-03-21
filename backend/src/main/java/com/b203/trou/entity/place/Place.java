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

    private String placeName;

    private String placeInfo;

    private BigDecimal longitude;

    private BigDecimal latitude;

    @OneToMany(mappedBy = "place")
    private List<Review> reviews = new ArrayList<>();
}
