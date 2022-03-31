package com.b203.trou.entity.trip;

import com.b203.trou.entity.BaseEntity;
import com.b203.trou.entity.place.Place;
import com.b203.trou.entity.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
@Setter
public class TripPlan extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "planId")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    private LocalDate startDate;

    private LocalDate endDate;

    public TripPlan(User user, LocalDate startDate, LocalDate endDate) {
        this.user = user;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    // 플랜이 추가될 떄
    // 유저가 가진 플랜 리스트에도 플랜 추가
    public void setUser(User user) {
        this.user = user;
        user.getTripPlans().add(this);
    }
}
