function initMap() {
  var polyCoords = JSON.parse(document.getElementById('neighborhood_def').innerHTML)

  var centerLat = 0;
  var centerLng = 0;
  for (let i = 0; i < polyCoords.length; i++) {
    centerLat += polyCoords[i]["lat"];
    centerLng += polyCoords[i]["lng"];
  }
  centerLat = centerLat / polyCoords.length;
  centerLng = centerLng / polyCoords.length;

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: centerLat, lng: centerLng },
    mapTypeId: "terrain",
  });
  // Construct the polygon.
  const poly = new google.maps.Polygon({
    // paths: triangleCoords,
    paths: polyCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  poly.setMap(map);
}
