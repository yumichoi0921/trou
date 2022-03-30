package com.b203.trou.service.trip;

import com.b203.trou.entity.trip.TripPlan;
import com.b203.trou.entity.user.User;
import com.b203.trou.model.trip.TripPlanDto;
import com.b203.trou.repository.trip.TripPlanRepository;
import com.b203.trou.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TripPlanService {

    private final TripPlanRepository tripPlanRepository;
    private final UserRepository userRepository;

    public List<TripPlanDto> getTripPlans(long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new IllegalArgumentException("해당하는 유저가 없습니다."));
        return tripPlanRepository.findByUser(user).stream().map(TripPlanDto::new).collect(Collectors.toList());
    }

    @Transactional
    public TripPlanDto createTripPlan(TripPlanDto tripPlanDto, long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new IllegalArgumentException("해당하는 유저가 없습니다."));
        TripPlan tripPlan = new TripPlan(user, tripPlanDto.getStartDate(), tripPlanDto.getEndDate());
        tripPlanRepository.save(tripPlan);
        tripPlan.setUser(user);
        return new TripPlanDto(tripPlan);
    }

    @Transactional
    public TripPlanDto modifyTripPlan(TripPlanDto tripPlanDto, long planId) {
        TripPlan tripPlan = tripPlanRepository.findById(planId).orElseThrow(()->new IllegalArgumentException("해당하는 계획이 없습니다."));
        tripPlan.setStartDate(tripPlanDto.getStartDate());
        tripPlan.setEndDate(tripPlanDto.getEndDate());
        tripPlanRepository.save(tripPlan);
        return new TripPlanDto(tripPlan);
    }

    public TripPlanDto deleteTripPlan(long planId) {
        TripPlan tripPlan = tripPlanRepository.findById(planId).orElseThrow(()->new IllegalArgumentException("해당하는 계획이 없습니다."));
        tripPlanRepository.delete(tripPlan);
        return new TripPlanDto(tripPlan);

    }
}