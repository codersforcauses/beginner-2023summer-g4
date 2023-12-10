// game.js

import { generateNewStreetView, streetViewLocation } from './streetview.js';

//const generateNewStreetView = require('./streetview.js')

var picked;
var distanced; 

var totalScore = 0;
var roundNumber = 1;

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
    totalScore += data['score'];
    //console.log('Response data:', data);

    let popup = document.getElementById('popup');

    let pop_up_message = document.getElementById('popup-message');

    let pop_up_score = document.getElementById('popup-score');

    let popupElement = document.querySelector('.score-for-a-round-popup');
    let pop_up_button = popupElement.querySelector('button');


    if (data['score'] >= 495) {
      pop_up_message.innerHTML = 'That is the exact location! Perfect Score!'
      popupElement.style.borderColor = '#4DC25E';
      popupElement.style.background = '#e1ffe6';
      pop_up_button.style.background = '#4DC25E';
    } else if (data['score'] >= 400) {
      pop_up_message.innerHTML = 'That guess was very close!'
      popupElement.style.borderColor = '#b3ff00';
      popupElement.style.background = '#f3ffd6';
      pop_up_button.style.background = '#b3ff00';
    } else if (data['score'] >= 300) {
      pop_up_message.innerHTML = 'That guess was close!'
      popupElement.style.borderColor = '#d6ff00';
      popupElement.style.background = '#f3ffd6';
      pop_up_button.style.background = '#d6ff00';
    } else if (data['score'] >= 50) {
      pop_up_message.innerHTML = 'That guess was ok.'
      popupElement.style.borderColor = '#ffbf00';
      popupElement.style.background = '#ffeeba';
      pop_up_button.style.background = '#ffbf00';
    } else {
      pop_up_message.innerHTML = "That was a bad guess."
      popupElement.style.borderColor = '#ff0000';
      popupElement.style.background = '#ffe7e7';
      pop_up_button.style.background = '#ff0000';
    }
    
    pop_up_score.innerHTML = 'You got ' + data['score'] + ' points!'

    popup.classList.add('open-popup');


    generateNewStreetView();

    document.getElementById('round-no.').innerHTML = "Round: " +  roundNumber;
    document.getElementById('total-points').innerHTML = "Points: " +  totalScore;


  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function submit() {
  if (roundNumber === 10) {
    // handle end game stuff
    // send json to backend, to add to db
  }

  roundNumber++;
  console.log(`picked: ${picked} | distance: ${distanced}`);
  //post_data(picked);
  post_data(distanced);

}

function closePopup(){
  popup.classList.remove('open-popup');
}

const submit_button = document.getElementById('submit-button');

submit_button.addEventListener('click', submit)