package com.b203.trou.entity.tag;

import com.b203.trou.entity.BaseEntity;
import com.b203.trou.entity.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter

public class UserTag extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userTagId")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "tagId")
    private Tag tag;

    private int count;

    public UserTag(User user, Tag tag, int count) {
        this.user = user;
        this.tag = tag;
        this.count = count;
    }
}
