package com.b203.trou.entity.tag;

import com.b203.trou.entity.BaseEntity;
import com.b203.trou.entity.user.User;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class UserTag extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "userTagId")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "tagId")
    private Tag tag;

    private int count;
}