package com.b203.trou.entity.tag;

import com.b203.trou.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
public class Tag extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tagId")
    private Long id;

    private String tagName;

    public Tag(Long id, String tagName){
        this.id = id;
        this.tagName = tagName;
    }
}
