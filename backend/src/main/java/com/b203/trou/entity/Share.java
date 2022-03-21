package com.b203.trou.entity;

import com.b203.trou.entity.user.User;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Share extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "shareId")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "planId")
    private TripPlan tripPlan;
}
