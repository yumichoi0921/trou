package com.b203.trou.entity;

import com.b203.trou.entity.user.User;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
public class TripPlan extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "planId")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    private LocalDate startDate;

    private LocalDate endDate;

}
