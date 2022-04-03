package com.b203.trou.model.place;

import lombok.*;

@NoArgsConstructor
@Getter
@AllArgsConstructor
@Setter
@Data
public class PlaceResponseDto {
    String place_id;
    String place_name;
    int read_count;
    String tags;
    String mapx;
    String mapy;
    String img;
}
