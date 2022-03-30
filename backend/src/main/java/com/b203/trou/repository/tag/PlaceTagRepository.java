package com.b203.trou.repository.tag;

import com.b203.trou.entity.tag.PlaceTag;
import com.b203.trou.entity.tag.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaceTagRepository extends JpaRepository<PlaceTag, Long> {
    List<PlaceTag> findByTag(Tag tag);
}
