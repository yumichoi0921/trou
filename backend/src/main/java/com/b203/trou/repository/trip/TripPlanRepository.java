package com.b203.trou.repository.trip;

import com.b203.trou.entity.trip.TripPlan;
import com.b203.trou.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripPlanRepository extends JpaRepository<TripPlan, Long> {
    List<TripPlan> findByUser(User user);
}
