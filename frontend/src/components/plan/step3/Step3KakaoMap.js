/* global kakao */
import React, { useEffect, useState } from "react";
import Dijkstra from "../Dijkstra";

const KakaoMap = () => {
  // const [positions, setPositions] = useState([]);
  const pos = [
    { place_name: "start", lat: 37.497625593121384, lng: 127.02935713582038 },
    { place_name: "A", lat: 37.499427948430814, lng: 127.02794423197847 },
    { place_name: "B", lat: 37.498553760499505, lng: 127.02882598822454 },
    { place_name: "end", lat: 37.499590490909185, lng: 127.0263723554437 },
  ];

  useEffect(() => {
    async function getMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(37.499590490909185, 127.0263723554437),
        level: 4,
      };
      var map = new kakao.maps.Map(container, options);
      // 마커를 표시할 위치 배열입니다
      var positions = pos.map((p) => ({
        title: p.place_name,
        latlng: new kakao.maps.LatLng(p.lat, p.lng),
      }));
      // 마커 이미지의 이미지 주소입니다
      var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

      for (var i = 0; i < positions.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(20, 30);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });
      }

      var order;
      await Dijkstra(pos).then((result) => {
        order = result;
      });

      var linePath = [];
      for (let i = 0; i < order.length; i++) {
        const idx = order[i];
        linePath.push(new kakao.maps.LatLng(pos[idx].lat, pos[idx].lng));
      }

      // 지도에 표시할 선을 생성합니다
      var polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: "#FFAE00", // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
      });

      // 지도에 선을 표시합니다
      polyline.setMap(map);
    }

    getMap();
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};
export default KakaoMap;
