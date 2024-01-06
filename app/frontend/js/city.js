// city.js

import { generateNewStreetView, updateIframeLocation } from './components/streetview.js';
import { runTimer, endTimer, currentTimerID} from './components/timer.js';
import { correctIcon, userIcon } from './components/main.js';
import { loadStreetViewAndMap } from './components/load.js';

let map;
let streetViewLocation;

var round;
var complete;

var totalScore = 0;
var roundNumber = 1;

// all the below variables can be compressed into one fat object which contained all the info on a round

let marker;

let correct_marker;

let userPickedLocation;

let popUpMap;

let popUpUserMarker;

let popUpCorrectMarker;

let line;

const submit_button = document.getElementById('submit-button');

const next_round_button = document.getElementById('next-round');

const reset_sv_button = document.getElementById('reset-sv-button');

loadStreetViewAndMap().then((result) => {

  if (result) {
    map = result.map;
    streetViewLocation = result.streetViewLocation;
    runTimer(15, submit);
    startGame();
  } else {
    console.error('Failed to load street view and map.');
  }
});

function startGame(){
  console.log("start game now!");
  map.on('click', function(e) {

    if (marker !== undefined){
      map.removeLayer(marker);
    }
  
    userPickedLocation = e.latlng;
  
    marker = L.marker(e.latlng, {icon: userIcon}).addTo(map);

    makeSubmitButtonClickable();
  
    let round_data = {
      game_mode: "city",
      round: Number(roundNumber),  // TO DO: add elapsed time
      distance: Number(e.latlng.distanceTo(streetViewLocation))
    }
    round = JSON.stringify(round_data);

    // latitude: Number(e.latlng.lat)
    // longitude: Number(e.latlng.lng)
  
  });
}

// these two functions are for the submit button
function darken () {
  submit_button.style.backgroundColor = 'rgb(153, 183.6, 229.5)';
}

function lighten () {
  submit_button.style.backgroundColor = 'rgb(170, 204, 255)';
}

function makeSubmitButtonClickable(){
  submit_button.style.opacity = 1;
  submit_button.addEventListener('click', submit);
  submit_button.addEventListener('mouseover', darken);
  submit_button.addEventListener('mouseout', lighten);

}

function greyOutSubmitButton(){
  submit_button.style.opacity = 0.7;
  submit_button.removeEventListener('click', submit);
  submit_button.removeEventListener('mouseover', darken);
  submit_button.removeEventListener('mouseout', lighten);
}

function post_data(send, endpoint){
  const url = `${endpoint}/api/submit`;

  const picked_post = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(send)
  };

  console.log(send);

  fetch(endpoint, picked_post)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {

      let score = data['score'];

      totalScore += ((score == -1) ? 0 : score);

      let popup = document.getElementById('popup');

      let pop_up_message = document.getElementById('popup-message');

      let pop_up_score = document.getElementById('popup-score');

      let popupElement = document.querySelector('.score-for-a-round-popup');
      let pop_up_button = popupElement.querySelector('button');

      //correct_marker = L.marker(streetViewLocation, {icon: correctIcon}).addTo(map);


      if (score >= 500) {
        pop_up_message.innerHTML = 'That is close to the exact location, Perfect Score!'
        popupElement.style.borderColor = '#4DC25E';
        popupElement.style.background = '#e1ffe6';
        pop_up_button.style.background = '#4DC25E';
      } else if (score >= 400) {
        pop_up_message.innerHTML = 'That guess was close!'
        popupElement.style.borderColor = '#b3ff00';
        popupElement.style.background = '#f3ffd6';
        pop_up_button.style.background = '#b3ff00';
      // } else if (score >= 300) {
      //   pop_up_message.innerHTML = 'That was a decent guess'
      //   popupElement.style.borderColor = '#d6ff00';
      //   popupElement.style.background = '#f3ffd6';
      //   pop_up_button.style.background = '#d6ff00';
      } else if (score >= 200) {
        pop_up_message.innerHTML = 'That guess was ok'
        popupElement.style.borderColor = '#ffbf00';
        popupElement.style.background = '#ffeeba';
        pop_up_button.style.background = '#ffbf00';
      } else if (score >= 0){
        pop_up_message.innerHTML = "That was a bad guess"
        popupElement.style.borderColor = '#ff0000';
        popupElement.style.background = '#ffe7e7';
        pop_up_button.style.background = '#ff0000';
      }
      else {
        pop_up_message.innerHTML = "You ran out of time!"
        popupElement.style.borderColor = '#ff0000';
        popupElement.style.background = '#ffe7e7';
        pop_up_button.style.background = '#ff0000';
      }
      
      pop_up_score.innerHTML = 'You got ' + ((score == -1) ? 0 : score) + ' points';

      if (roundNumber === 1){
        generateEndGameMap();
      }

      updatePopUpMap();

      streetViewLocation = generateNewStreetView();

      popup.classList.add('open-popup');
      roundNumber++;

  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function submit() {

  greyOutSubmitButton();

  endTimer(currentTimerID);

  if (marker === undefined){

    let round_data = {
      game_mode: "city",
      round: roundNumber,
      distance: -1
    }
    round = JSON.stringify(round_data);
  }

  document.getElementById('map-guess-container').classList.add('slide-away');
  const url_submit = `${endpoint}/api/submit`;
  post_data(round, url_submit);


  if (roundNumber === 10) {

    let complete_data = {
      game_mode: "city",
      usern: localStorage.getItem('username'),
      totalscore: Number(totalScore)
    }
    complete = JSON.stringify(complete_data);
    const url_complete = `${endpoint}/api/end`;
    post_data(complete, url_complete);
  }

}

async function closePopup(){

  streetViewLocation = await streetViewLocation;

  updateIframeLocation(streetViewLocation.lat, streetViewLocation.lng);

  popup.classList.remove('open-popup');
  // map.removeLayer(correct_marker);
  popUpMap.removeLayer(popUpCorrectMarker)
  if (marker !== undefined){
    map.removeLayer(marker);
    popUpMap.removeLayer(popUpUserMarker);
    popUpMap.removeLayer(line);
  }
  resetMap();

  marker = undefined;
  // correct_marker = undefined;
  popUpCorrectMarker = undefined;
  popUpUserMarker = undefined;
  userPickedLocation = undefined;
  line = undefined;

  document.getElementById('round-no.').innerHTML = "<strong>Round: " +  roundNumber +"</strong>";
  document.getElementById('total-points').innerHTML = "<strong>Points: " +  totalScore+"</strong>";
  document.getElementById('map-guess-container').classList.remove('slide-away');
  document.title = `${roundNumber} | PerthPinpoint`

  runTimer(1000);

}

function resetMap() {
  map.setView([-31.997564, 115.824893], 9);
}

function generateEndGameMap() {

  popUpMap = L.map('pop-up-map', {
    zoomDelta: 0.1,
    zoomSnap: 0,
    wheelDebounceTime: 100
  }).setView(streetViewLocation, 9); 

  popUpMap.doubleClickZoom = false;

  L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}@2x.png?key=yKxYycTR24wt9spqlP62',{ //style URL
  tileSize: 512,
  zoomOffset: -1,
  minZoom: 1,
  crossOrigin: true,
  }).addTo(popUpMap);

}

function updatePopUpMap(){

  popUpCorrectMarker = L.marker(streetViewLocation, {icon: correctIcon}).addTo(popUpMap);

  if (userPickedLocation === undefined) {
    popUpMap.setView(streetViewLocation, 12);
  }
  else{

    let bounds = L.latLngBounds(streetViewLocation, userPickedLocation).pad(0.19);

    popUpMap.fitBounds(bounds);

    popUpMap.fitBounds(bounds);

    popUpUserMarker = L.marker(userPickedLocation, {icon: userIcon}).addTo(popUpMap);

    // Add a dotted line between the coordinates
    line = L.polyline([streetViewLocation, userPickedLocation], {
      color: 'blue',
      dashArray: '5, 10', // Adjust the dash pattern (5 pixels dashed, 10 pixels gap)
      weight: 2, // Adjust the line weight
    }).addTo(popUpMap);

  }



  // Function to handle map resizing
  function handleMapResize() {
    popUpMap.invalidateSize();
  }

  setInterval(handleMapResize, 5);
}

function resetValues(){

}

reset_sv_button.addEventListener('click', function () {
  updateIframeLocation(streetViewLocation.lat, streetViewLocation.lng);
}
)

next_round_button.addEventListener('click', closePopup)

export {submit, makeSubmitButtonClickable, greyOutSubmitButton};

