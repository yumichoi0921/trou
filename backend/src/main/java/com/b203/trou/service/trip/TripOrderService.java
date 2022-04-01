package com.b203.trou.service.trip;

import com.b203.trou.entity.place.Place;
import com.b203.trou.entity.trip.TripOrder;
import com.b203.trou.entity.trip.TripRoute;
import com.b203.trou.model.trip.TripOrderDto;
import com.b203.trou.repository.place.PlaceRepository;
import com.b203.trou.repository.trip.TripOrderRepository;
import com.b203.trou.repository.trip.TripRouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TripOrderService {
    private final TripOrderRepository tripOrderRepository;
    private final TripRouteRepository tripRouteRepository;
    private final PlaceRepository placeRepository;

    public List<TripOrderDto> getTripOrder(long routeId) {
        TripRoute tripRoute =  tripRouteRepository.findById(routeId).orElseThrow(()->new IllegalArgumentException("해당하는 트립 루트가 없습니다."));
        List<TripOrderDto> tripOrders = tripOrderRepository.findByTripRoute(tripRoute).stream().map(TripOrderDto::new).collect(Collectors.toList());
        return tripOrders;
    }

    @Transactional
    public List<TripOrderDto> createTripOrder(List<TripOrderDto> tripOrderDtos, long routeId) {
        List<TripOrderDto> result = new ArrayList<>();
        TripRoute tripRoute =  tripRouteRepository.findById(routeId).orElseThrow(()->new IllegalArgumentException("해당하는 트립 루트가 없습니다."));
        for (TripOrderDto tripOrderDto: tripOrderDtos) {
            Place place = placeRepository.findById(tripOrderDto.getPlaceId()).orElseThrow(()->new IllegalArgumentException("해당하는 장소가 없습니다."));
            TripOrder tripOrder = new TripOrder(tripRoute, place, tripOrderDto.getTripOrder(), tripOrderDto.getStartTime(), tripOrderDto.getEndTime());
            tripOrderRepository.save(tripOrder);
            result.add(new TripOrderDto(tripOrder));
        }
        return result;
    }

    @Transactional
    public TripOrderDto modifyTripOrder(TripOrderDto tripOrderDto, long orderId) {
        TripOrder tripOrder = tripOrderRepository.findById(orderId).orElseThrow(()->new IllegalArgumentException("해당하는 트립 오더가 없습니다."));
        tripOrder.setTripOrder(tripOrderDto.getTripOrder());
        tripOrder.setStartTime(tripOrderDto.getStartTime());
        tripOrder.setEndTime(tripOrderDto.getEndTime());
        return new TripOrderDto(tripOrder);
    }

    public TripOrderDto deleteTripOrder(long orderId) {
        TripOrder tripOrder = tripOrderRepository.findById(orderId).orElseThrow(()->new IllegalArgumentException("해당하는 트립 오더가 없습니다."));
        tripOrderRepository.delete(tripOrder);
        return new TripOrderDto(tripOrder);
    }
}
