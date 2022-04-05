package com.b203.trou.entity.restaurant;

import com.b203.trou.parsing.DataModel;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
public class Restaurant {

    @Id
    @GeneratedValue
    @Column(name = "restaurantId")
    private Long id;
    private String name;
    private String branch;
    private String area;
    private String tel;
    private String address;
    private Float latitude;
    private Float longitude;

    public Restaurant(DataModel dataModel) {
        this.name = dataModel.getName();
        this.branch = dataModel.getBranch();
        this.area = dataModel.getArea();
        this.tel = dataModel.getTel();
        this.address = dataModel.getAddress();
        this.latitude = dataModel.getLatitude();
        this.longitude = dataModel.getLongitude();
    }
}
