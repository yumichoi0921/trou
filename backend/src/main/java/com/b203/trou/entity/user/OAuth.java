package com.b203.trou.entity.user;

import com.b203.trou.entity.BaseEntity;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class OAuth extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "oauthId")
    private Long id;

    @OneToOne
    @JoinColumn(name = "userId")
    private User user;

    private String authCode;
}
