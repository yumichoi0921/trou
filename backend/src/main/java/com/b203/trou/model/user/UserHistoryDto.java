package com.b203.trou.model.user;


import com.b203.trou.entity.place.Place;
import com.b203.trou.entity.user.User;
import com.b203.trou.entity.user.UserHistory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserHistoryDto {

    long userHistoryId;
    User user;
    Place place;

    public UserHistoryDto(UserHistory userHistory){
        this.userHistoryId = userHistory.getId();
        this.user = userHistory.getUser();
        this.place = userHistory.getHistory();
    }


}
