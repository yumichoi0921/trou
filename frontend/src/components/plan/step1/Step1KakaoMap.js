/* global kakao */
import { Box } from "@mui/material";
import React, { useEffect } from "react";

const KakaoMap = (props) => {
  let index = 0;
  const markers = [];
  markers.push(new kakao.maps.Marker());
  markers.push(new kakao.maps.Marker());
  markers.push(new kakao.maps.Marker());
  markers.push(new kakao.maps.Marker());
  markers.forEach((m) => m.setDraggable(true));

  // 인포윈도우를 생성합니다
  const infowindows = [];
  infowindows.push(new kakao.maps.InfoWindow());
  infowindows.push(new kakao.maps.InfoWindow());
  infowindows[0].setContent("출발지");
  infowindows[1].setContent("도착지");

  useEffect(() => {
    async function getMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(33.400701, 126.570667), // 지도의 중심좌표
        level: 9,
      };
      var map = new kakao.maps.Map(container, options);

      // 지도에 마커를 표시합니다
      markers[0].setMap(map);
      markers[1].setMap(map);

      // 지도에 클릭 이벤트를 등록합니다
      // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
      kakao.maps.event.addListener(map, "click", function (mouseEvent) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        var latlng = mouseEvent.latLng;
        markers[index % 2].setPosition(latlng);
        props.setMap(map);
        const startPlace = [...props.point.startPlace];
        const endPlace = [...props.point.endPlace];
        const date = props.selected.selectedDate;
        if (index % 2 === 0) {
          startPlace[date] = {
            mapX: latlng.getLng(),
            mapY: latlng.getLat(),
            placeName: "출발지",
          };
          props.point.setStartPlace(startPlace);
        } else {
          endPlace[date] = {
            mapX: latlng.getLng(),
            mapY: latlng.getLat(),
            placeName: "도착지",
          };
          props.point.setEndPlace(endPlace);
        }

        infowindows[index % 2].setPosition(latlng);
        infowindows[index % 2].open(map, markers[index % 2]);
        index++;
      });
    }

    getMap();
  }, [props.selected.selectedDate]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};
export default KakaoMap;
