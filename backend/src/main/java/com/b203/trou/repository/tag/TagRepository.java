package com.b203.trou.repository.tag;

import com.b203.trou.entity.tag.Tag;
import com.b203.trou.model.tag.TagDto;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {


}
