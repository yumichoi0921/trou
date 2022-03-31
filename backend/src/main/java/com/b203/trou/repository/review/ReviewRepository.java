package com.b203.trou.repository.review;

import com.b203.trou.entity.place.Place;
import com.b203.trou.entity.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByPlace(Place place);
}
