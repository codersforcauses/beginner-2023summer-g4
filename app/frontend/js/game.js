// game.js

var picked;
var distanced;

var marker = {};

map.on('click', function(e) {

  if (marker != undefined){
    map.removeLayer(marker);
  }

  marker = L.marker(e.latlng).addTo(map);

  picked = e.latlng;
  distanced = e.latlng.distanceTo(streetViewLocation);

});

function submit() {
  console.log(`picked: ${picked}, distance: ${distanced}`);
  
}