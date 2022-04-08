/* global kakao */
import React, { useEffect } from "react";
import "../../kakaomap/overlay.css";
import markerImg from "../../kakaomap/newmarker.png";

const KakaoMap = ({ plan }) => {
  const colors = [
    "#e91e63",
    "#9c27b0",
    "#3f51b5",
    "#00bcd4",
    "#4caf50",
    "#ffc107",
    "#795548",
    "#9e9e9e",
  ];
  useEffect(() => {
    async function getMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(
          33.400701, 126.570667
        ),
        level: 9,
      };
      var map = new kakao.maps.Map(container, options);
      for (const [index, route] of plan.routes.entries()) {
        // 마커를 표시할 위치 배열입니다
        var positions = route.order.map((p) => ({
          title: p.place.placeName,
          latlng: new kakao.maps.LatLng(p.place.mapY, p.place.mapX),
        }));

        for (var i = 0; i < positions.length; i++) {
          // 마커 이미지의 이미지 크기 입니다
          var imageSize = new kakao.maps.Size(30, 30);

          // 마커 이미지를 생성합니다
          var markerImage = new kakao.maps.MarkerImage(markerImg, imageSize);

          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
          });

          // 커스텀 오버레이에 표시할 내용입니다
          // HTML 문자열 또는 Dom Element 입니다
          var content = `<div class ="label"><span class="left"></span><span class="center">${positions[i].title}</span><span class="right"></span></div>`;

          // 커스텀 오버레이를 생성합니다
          var customOverlay = new kakao.maps.CustomOverlay({
            position: positions[i].latlng,
            content: content,
          });

          // 커스텀 오버레이를 지도에 표시합니다
          customOverlay.setMap(map);
        }
        var linePath = [];
        for (const o of route.order) {
          linePath.push(new kakao.maps.LatLng(o.place.mapY, o.place.mapX));
        }

        // 지도에 표시할 선을 생성합니다
        var polyline = new kakao.maps.Polyline({
          path: linePath, // 선을 구성하는 좌표배열 입니다
          strokeWeight: 5, // 선의 두께 입니다
          strokeColor: colors[index % colors.length], // 선의 색깔입니다
          strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: "solid", // 선의 스타일입니다
        });

        // 지도에 선을 표시합니다
        polyline.setMap(map);
      }
    }

    getMap();
  }, [plan]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};
export default KakaoMap;
