/* global kakao */
const INF = Infinity;
async function getMinDistance(pos) {
  const edges = [];
  for (const s of pos) {
    const distances = [];
    for (const e of pos) {
      const line = [
        new kakao.maps.LatLng(s.lat, s.lng),
        new kakao.maps.LatLng(e.lat, e.lng),
      ];
      var polyline = await new kakao.maps.Polyline({
        path: line, // 선을 구성하는 좌표배열 입니다
      });
      const dis = polyline.getLength();
      distances.push(dis);
    }
    edges.push(distances);
  }
  return edges;
}

async function dist(edges) {
  const visited = new Array(edges.length).fill(false);
  const minDist = new Array(edges.length).fill(INF);
  minDist[0] = 0;
  const order = [];

  for (let cnt = 0; cnt < edges.length; cnt++) {
    let minD = INF;
    let minIdx = -1;
    for (let i = 0; i < minDist.length; i++) {
      if (!visited[i] && minDist[i] < minD) {
        minD = minDist[i];
        minIdx = i;
      }
    }
    visited[minIdx] = true;
    order.push(minIdx);
    for (let i = 0; i < edges[minIdx].length; i++) {
      if (
        edges[minIdx][i] !== 0 &&
        !visited[i] &&
        minDist[minIdx] + edges[minIdx][i] < minDist[i]
      ) {
        minDist[i] = minDist[minIdx] + edges[minIdx][i];
      }
    }
  }
  return order;
}
const Dijkstra = async (pos) => {
  const edges = await getMinDistance(pos);
  const order = await dist(edges);
  return order;
};
export default Dijkstra;
