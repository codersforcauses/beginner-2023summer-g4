// sleuth.js

import { updateIframeLocation } from './components/streetview.js';
import { runTimer, endTimer, currentTimerID} from './components/timer.js';
import { correctIcon, userIcon, dropIcon, tips } from './components/main.js';
import { loadStreetViewAndMap } from './components/load.js';
import { makeSubmitButtonClickable, greyOutSubmitButton } from './components/submit-button.js';

let map;
let streetViewLocation;
let locations;
let current_location;

let popUpMap;
let currentLocationMapElements;

let userPickedLocation;
var picked_data;
let distanced_data = { game_mode: 'sleuth', data: "found_status", found: null};
let marker;

let scores = [null, null, null, null, null];
let roundNumber = 1;

const reset_sv_button = document.getElementById('reset-sv-button');

loadStreetViewAndMap().then(async (result) => {

    if (result) {
      map = result.map;
      streetViewLocation = result.streetViewLocation;
      locations = result.locationsSelected;
      current_location = locations[roundNumber-1];
      updateLocationForRound();

      runTimer(360, submit);
      // let map_guess = document.getElementById('map-guess-container');
      // map_guess.style.height = '95%';
      // map_guess.style.width = '43%';

      startGame();
    } else {
      console.error('Failed to load street view and map.');
    }
  });

function startGame(){
    map.on('click', function(e) {
      makeSubmitButtonClickable(submit);

    if (marker !== undefined){
      map.removeLayer(marker);
    }
  
    userPickedLocation = e.latlng;
  
    marker = L.marker(e.latlng, {icon: userIcon}).addTo(map);
  
    picked_data = {
      game_mode: 'sleuth',
      data: "picked",
      latitude: Number(e.latlng.lat),
      longitude: Number(e.latlng.lng)
    };

  
    distanced_data = {
      game_mode: 'slueth',
      data: "found_status",
      found: checkIfLocationIsFound(current_location)
    };
  
    //distanced = JSON.stringify(distanced_data);

    //console.log(distanced);
  
  })
}

function getRandomInt(len) {
  return Math.floor(Math.random() * (len + 1));
}

// This post_data() function is simpler as no points calc needs to be done
// but we can still send it to the backend to do stuff with it
function post_data(send) {
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
      })
      .catch(error => {
          console.error('Error:', error);
      });
}

function generatePolyLine(location){
  return L.polyline(location.geom, {color: '#0F53FF', weight: 7});
}

function generateEndGameMap() {

  popUpMap = L.map('pop-up-map', {
    // zoomDelta: 0.1,
    zoomSnap: 0,
    wheelDebounceTime: 100
  }).setView(streetViewLocation, 13);

  L.tileLayer("https://api.maptiler.com/maps/satellite/{z}/{x}/{y}@2x.jpg?key=yKxYycTR24wt9spqlP62", {
    tileSize: 512,
    zoomOffset: -1,
    }).addTo(popUpMap);

  let sleuthDropLocationMarker = L.marker(streetViewLocation, {
    icon: dropIcon
  }).addTo(popUpMap);

  L.circle(streetViewLocation, {radius: 2750, color: '#00eeff', dashArray: '5, 10', fill: false}).addTo(popUpMap);


  popUpMap.doubleClickZoom = false;

  // Function to handle map resizing
  function handleMapResize() {
    popUpMap.invalidateSize();
  }

  setInterval(handleMapResize, 5);
  
}


function updatePopUpMap(current_loc) {

  currentLocationMapElements = {'user-marker': null, road: null, 'dotted-line': null};

  const polyLineRoad = generatePolyLine(current_loc);
  polyLineRoad.addTo(popUpMap);
  currentLocationMapElements.road = polyLineRoad;

  if (userPickedLocation === undefined) {
    popUpMap.fitBounds(polyline.getBounds());
  }
  else {

    const bounds = L.latLngBounds(polyLineRoad.getCenter(), userPickedLocation).pad(0.25);

    popUpMap.fitBounds(bounds);

    currentLocationMapElements['user-marker'] = L.marker(userPickedLocation, {icon: userIcon}).addTo(popUpMap);

    // Add a dotted line between the coordinates
    
  }
}


function checkIfLocationIsFound(locations){
  return false;
}
  
function submit() {
    let distanced = JSON.stringify(distanced_data);

    greyOutSubmitButton(submit);
    endTimer(currentTimerID);
  
    if (roundNumber === 5) {
      // handle end game stuff
      // send json to backend, to add to db
    }
  
    document.getElementById('map-guess-container').classList.add('slide-away');
    document.getElementById('location-for-round-container').classList.add('slide-away');

  
    console.log(`picked: ${picked_data} | distance: ${distanced}`);
    //post_data(picked);
    post_data(distanced);
    
    createPopup();

    if (roundNumber === 1){
      generateEndGameMap();
    }

    updatePopUpMap(current_location);

    popup.classList.add('open-popup');
    roundNumber++;

  
  }

  function createPopup(){

        let popup = document.getElementById('popup');

        let pop_up_message = document.getElementById('popup-message');

        let pop_up_score = document.getElementById('popup-score');

        let popupElement = document.querySelector('.score-for-a-round-popup');
        let pop_up_button = popupElement.querySelector('button');

        //correct_marker = L.marker(streetViewLocation, {icon: correctIcon}).addTo(map);


        if (distanced_data.found) {
        pop_up_message.innerHTML = 'Nice! You found the exact location'
        popupElement.style.borderColor = '#4DC25E';
        popupElement.style.background = '#e1ffe6';
        pop_up_button.style.background = '#4DC25E';
        } 
        else if (distanced_data.found === false) {
        pop_up_message.innerHTML = 'You were too far!!'
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

        if (!distanced_data.found) {
          pop_up_score.innerHTML = tips[getRandomInt(tips.length-1)];
        }
        else if (distanced_data.found === null){
          pop_up_score.innerHTML = 'Check the map to see where the location was';
        }
    
  }

  function updateLocationForRound() {
    const locationInfoElement = document.getElementById('location-round-info');
    let innerHTMLContent = "Find: " + current_location.name;
    locationInfoElement.innerHTML = innerHTMLContent;
  
  }

  function closePopup(){

    greyOutSubmitButton(submit);
  
    popup.classList.remove('open-popup');
    // map.removeLayer(correct_marker);

    for (const key in currentLocationMapElements){
      if (currentLocationMapElements[key] !== null) {
        console.log(currentLocationMapElements[key]);
        popUpMap.removeLayer(currentLocationMapElements[key]);
      }
    }


    if (marker !== undefined){
      map.removeLayer(marker);
    }
  
    marker = undefined;
    userPickedLocation = undefined;

  
    document.getElementById('round-no.').innerHTML = "<strong>Round: " +  roundNumber +"</strong>";
    // document.getElementById('total-points').innerHTML = "<strong>Points: " +  totalScore+"</strong>";
    document.getElementById('map-guess-container').classList.remove('slide-away');
    document.getElementById('location-for-round-container').classList.remove('slide-away');
    //document.title = `${roundNumber} | PerthPinpoint`

    current_location = locations[roundNumber-1];

    console.log("FIND: "+ current_location.name);

    updateLocationForRound();


    runTimer(1000);
  
  }


  reset_sv_button.addEventListener('click', function () {
    updateIframeLocation(streetViewLocation.lat, streetViewLocation.lng);
  }
  )

const next_round_button = document.getElementById('next-round');

next_round_button.addEventListener('click', closePopup)
  

