package com.b203.trou.entity;

import javax.persistence.*;

@Entity
public class Tag extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tagId")
    private Long id;

    private String tagName;
}
