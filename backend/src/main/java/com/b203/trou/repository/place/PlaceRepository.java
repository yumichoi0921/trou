package com.b203.trou.repository.place;

import com.b203.trou.entity.place.Place;
import com.b203.trou.entity.tag.PlaceTag;
import com.b203.trou.model.place.PlaceDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlaceRepository extends JpaRepository<Place, Long> {


    List<PlaceDto> findByPlaceNameContaining(String keyword);



}
