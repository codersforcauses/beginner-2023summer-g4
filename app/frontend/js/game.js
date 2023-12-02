map.on('click', function(e) {
  
  const dist = e.latlng.distanceTo(streetViewLocation);

  alert('The distance between the Street View and where you clicked is ' + Math.round(dist));
});