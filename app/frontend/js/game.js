// game.js

var picked;
var distanced; 

var marker = {};

map.on('click', function(e) {

  if (marker != undefined){
    map.removeLayer(marker);
  }

  marker = L.marker(e.latlng).addTo(map);

  let picked_data = {
    data: String("picked"),
    latitude: Number(e.latlng.lat),
    longitude: Number(e.latlng.lng)
  };

  picked = JSON.stringify(picked_data);

  let distanced_data = {
    data: String("distanced"),
    distance: Number(e.latlng.distanceTo(streetViewLocation))
  };

  distanced = JSON.stringify(distanced_data);

});

function post_data(send){
  const url = `${endpoint}/api/submit`;

  const picked_post = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(send)
  };

  fetch(url, picked_post)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Response data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function submit() {
  console.log(`picked: ${picked}, distance: ${distanced}`);
  post_data(picked);
  post_data(distanced);
}