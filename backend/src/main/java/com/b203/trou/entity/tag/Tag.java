package com.b203.trou.entity.tag;

import com.b203.trou.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Tag extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "tagId")
    private Long id;

    private String tagName;
}
