map.on('click', function(e) {

  L.marker(e.latlng).addTo(map);

  
  
  const dist = e.latlng.distanceTo(streetViewLocation);

  console.log("The distance between the Street View and where you clicked is " + Math.round(dist));
});