package com.b203.trou.model.tag;

import com.b203.trou.entity.tag.Tag;
import com.b203.trou.entity.user.User;
import lombok.*;


@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
public class UserTagDto {

    private Long id;
    private User user;
    private Tag tag;
    private int count;


}
