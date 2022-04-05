/* global kakao */
import React, { useEffect } from "react";

const KakaoMap = ({ plan }) => {
  useEffect(() => {
    async function getMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(37.497625593121384, 127.02935713582038),
        level: 4,
      };
      var map = new kakao.maps.Map(container, options);
    }

    getMap();
  }, [plan]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};
export default KakaoMap;
