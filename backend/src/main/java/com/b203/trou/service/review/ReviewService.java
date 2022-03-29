package com.b203.trou.service.review;

import com.b203.trou.entity.place.Place;
import com.b203.trou.entity.review.Review;
import com.b203.trou.entity.user.User;
import com.b203.trou.model.review.ReviewDto;
import com.b203.trou.repository.place.PlaceRepository;
import com.b203.trou.repository.review.ReviewRepository;
import com.b203.trou.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final PlaceRepository placeRepository;
    private final UserRepository userRepository;

    public List<ReviewDto> getPlaceReviews(long placeId) {
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new IllegalArgumentException("해당하는 장소가 없습니다."));
        List<Review> reviews = place.getReviews();
        return reviews.stream().map(ReviewDto::new).collect(Collectors.toList());
    }

    public List<ReviewDto> getUserReviews(long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("해당하는 유저가 없습니다."));
        List<Review> reviews = user.getReviews();
        return reviews.stream().map(ReviewDto::new).collect(Collectors.toList());
    }

    @Transactional
    public ReviewDto createReview(ReviewDto reviewDto, long placeId, long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("해당하는 유저가 없습니다."));
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new IllegalArgumentException("해당하는 장소가 없습니다."));
        Review review = new Review(user, place, reviewDto.getContent(), reviewDto.getScore());
        reviewRepository.save(review);
        review.setPlace(place);
        review.setUser(user);
        return new ReviewDto(review);
    }
}
