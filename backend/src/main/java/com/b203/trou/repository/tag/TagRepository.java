package com.b203.trou.repository.tag;

import com.b203.trou.entity.tag.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {

    List<Tag> findByTagNameLike(String keyword);

}
