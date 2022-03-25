package com.b203.trou.entity.tag;

import com.b203.trou.entity.BaseEntity;

import javax.persistence.*;

@Entity
public class Tag extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tagId")
    private Long id;

    private String tagName;
}
