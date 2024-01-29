// city.js

import { generateNewStreetView, updateIframeLocation } from './components/streetview.js';
import { runTimer, endTimer, resetClock, currentTimerID} from './components/timer.js';
import { correctIcon, userIcon } from './components/main.js';
import { loadStreetViewAndMap } from './components/load.js';
import { makeSubmitButtonClickable, greyOutSubmitButton } from './components/submit-button.js';

let map;
let streetViewLocation;

let round_data;
let complete;

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

const next_round_button = document.getElementById('next-round');

const reset_sv_button = document.getElementById('reset-sv-button');

loadStreetViewAndMap().then((result) => {

  if (result) {
    map = result.map;
    streetViewLocation = result.streetViewLocation;
    runTimer(30, submit);
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

    makeSubmitButtonClickable(submit);
  
    round_data = {
      game_mode: "city",
      round: Number(roundNumber),  // TO DO: add elapsed time
      distance: Number(e.latlng.distanceTo(streetViewLocation))
    }
    //round = JSON.stringify(round_data);

    // latitude: Number(e.latlng.lat)
    // longitude: Number(e.latlng.lng)
  
  });
}


function post_data(send, endpoint){
  //const url = `${endpoint}/api/submit`;

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

    if (data.hasOwnProperty('alert')) {
        let alert = data['alert'];
        console.log(alert);

        if (alert === "new high score") {
          sessionStorage.setItem("newhighscore", 'true');
        }
        else if (alert === "no new high score") {
          sessionStorage.setItem("newhighscore", 'false');
        }
      }

      const score = data['score'];
      const multiplier = data['multiplier'];

      console.log(data);


      totalScore += Math.round(((score == -1) ? 0 : score) * multiplier);


      let popup = document.getElementById('popup');

      let pop_up_message = document.getElementById('popup-message');

      let pop_up_score = document.getElementById('popup-score');

      let popupElement = document.querySelector('.score-for-a-round-popup');
      let pop_up_button = popupElement.querySelector('button');

      //correct_marker = L.marker(streetViewLocation, {icon: correctIcon}).addTo(map);


      if (score >= 500) {
        pop_up_message.innerHTML = 'Perfect Score!'
        popupElement.style.borderColor = '#4DC25E';
        popupElement.style.background = '#e1ffe6';
        pop_up_button.style.background = '#4DC25E';
      } else if (score >= 400) {
        pop_up_message.innerHTML = 'That guess was close!'
        popupElement.style.borderColor = '#b3ff00';
        popupElement.style.background = '#f3ffd6';
        pop_up_button.style.background = '#b3ff00';
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
      
      pop_up_score.innerHTML = 'You got ' + (Math.round(((score == -1) ? 0 : score) * multiplier)) + ' points';

      if (multiplier >= 1.4) {
        pop_up_score.innerHTML += '<br>That was a fast guess! Points were multiplied by ' + multiplier + 'x';
      } 
      else if (multiplier >= 1.3) {
          pop_up_score.innerHTML += '<br>You guessed pretty fast! Points were multiplied by ' + multiplier + 'x';
      } 
      else if (multiplier >= 1.2) {
          pop_up_score.innerHTML += '<br>Good job! Your points were multiplied by ' + multiplier + 'x for a reasonably quick guess.';
      } 
      else if (multiplier >= 1.1) {
          pop_up_score.innerHTML += '<br>You gained a slight bonus with a ' + multiplier + 'x multiplier for your guess speed.';
      } 

      if (roundNumber === 1){
        generateEndGameMap();
      }

      if (roundNumber === 10) {

        document.getElementById('next-round').innerHTML = 'Go to the leaderboard';

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

  greyOutSubmitButton(submit);

  const elapsedTime = endTimer(currentTimerID);

  if (marker === undefined){

    round_data = {
      game_mode: "city",
      round: roundNumber,
      distance: -1,
      elapsedTime: null
    }
  }
  else {

    round_data = {
      game_mode: "city",
      round: roundNumber,
      distance: Number(userPickedLocation.distanceTo(streetViewLocation)),
      elapsedTime: elapsedTime
    }
  }

  const round = JSON.stringify(round_data);

  document.getElementById('map-guess-container').classList.add('slide-away');

  const url_submit = `/api/submit`;
  post_data(round, url_submit);

}

async function closePopup(){

  if (roundNumber === 11) {
    let complete_data = {
    game_mode: "city",
            usern: localStorage.getItem('username'),
            totalscore: Number(totalScore)
          }
          complete = JSON.stringify(complete_data);
          const url_complete = `/api/end`;
          post_data(complete, url_complete);
      
          sessionStorage.setItem("lastscore", totalScore);
          window.location.href = "/leaderboard";
    return;
  }

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

  const roundNoElements = document.getElementsByClassName('round-no.');
  for (let i = 0; i < roundNoElements.length; i++) {
    roundNoElements[i].innerHTML = "<strong>Round: " +  roundNumber +"</strong>";
  }

  const totalPointsElements = document.getElementsByClassName('total-points');
  for (let i = 0; i < totalPointsElements.length; i++) {
    totalPointsElements[i].innerHTML = "<strong>Points: " +  totalScore +"</strong>";
  }

  let map_guess_container = document.getElementById('map-guess-container')
  if (window.innerWidth < 700) {
    map_guess_container.style.display = '';
  }
  map_guess_container.classList.remove('slide-away');

  document.title = `${roundNumber} | Classic City`

  resetClock();

  runTimer(360);

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

//export {submit, SubmitButtonClickable, greyOutSubmitButton};

