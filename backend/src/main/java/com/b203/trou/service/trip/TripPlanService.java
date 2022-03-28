package com.b203.trou.service.trip;

import com.b203.trou.entity.trip.TripPlan;
import com.b203.trou.entity.user.User;
import com.b203.trou.model.tag.TagDto;
import com.b203.trou.model.trip.TripPlanDto;
import com.b203.trou.repository.tag.TagRepository;
import com.b203.trou.repository.trip.TripPlanRepository;
import com.b203.trou.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TripPlanService {
    @Autowired
    private TripPlanRepository tripPlanRepository;
    private UserRepository userRepository;

    public List<TripPlanDto> getTripPlans() {
        return tripPlanRepository.findAll().stream().map(TripPlanDto::new).collect(Collectors.toList());
    }

    @Transactional
    public TripPlanDto createTripPlan(TripPlanDto tripPlanDto, String userId) {
        Optional<User> user = userRepository.findById(Long.parseLong(userId));
        if (user.isEmpty()) throw new IllegalArgumentException("해당 유저가 없습니다.");
        TripPlan tripPlan = new TripPlan(user.get(), tripPlanDto.getStartDate(), tripPlanDto.getEndDate());
        tripPlanRepository.save(tripPlan);
        return new TripPlanDto(tripPlan);
    }
}
