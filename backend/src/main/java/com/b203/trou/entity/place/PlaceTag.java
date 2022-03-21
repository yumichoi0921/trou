package com.b203.trou.entity.place;

import com.b203.trou.entity.BaseEntity;
import com.b203.trou.entity.Tag;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class PlaceTag extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "placeTagId")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "placeId")
    private Place place;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tagId")
    private Tag tag;

    private int count;

}
