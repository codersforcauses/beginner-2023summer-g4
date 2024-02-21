// sleuth.js

import { updateIframeLocation } from './components/streetview.js';
import { runTimer, endTimer, resetClock, currentTimerID} from './components/timer.js';
import { correctIcon, userIcon, dropIcon, tips } from './components/main.js';
import { loadStreetViewAndMap } from './components/load.js';
import { makeSubmitButtonClickable, greyOutSubmitButton } from './components/submit-button.js';

let map;
let streetViewLocation;
let locations;
let current_location;
let referenceLoc;

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
      document.title = "PerthPinpoint | Street Sleuth";
      map = result.map;
      streetViewLocation = result.streetViewLocation;
      locations = result.locationsSelected;
      current_location = locations[roundNumber-1];
      referenceLoc = result.referenceLoc;
      updateLocationForRound();

      runTimer(300, submit);

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

  L.tileLayer("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {

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


function checkIfLocationIsFound(locations) {
  const roadPolyLine = generatePolyLine(locations);

  // Make sure L.GeometryUtil is defined before calling closest
  if (L.GeometryUtil) {
      const closestPoint = L.GeometryUtil.closest(map, roadPolyLine, userPickedLocation);
      const distance = closestPoint.distanceTo(userPickedLocation);
      return distance < 25; // 30m tolerance
  } else {
      console.error('L.GeometryUtil is not defined. Make sure the library is loaded.');
      return false;
  }
}

  
function submit() {
    let distanced = JSON.stringify(distanced_data);

    greyOutSubmitButton(submit);
    endTimer(currentTimerID);

    const elem_id = "loc-" + (roundNumber);
    const elem = document.getElementById(elem_id);

    if (distanced_data.found){
      elem.src = '/static/assets/green.png';
    }
    else {

      elem.src = '/static/assets/red.png';

    }
  
    if (roundNumber === 5) {
      // handle end game stuff
      // send json to backend, to add to db
    }

    document.getElementById('map-guess-container').classList.add('slide-away');
    document.getElementById('location-for-round-container').classList.add('slide-away');

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

        if (roundNumber === 5) {
          document.getElementById('next-round').innerHTML = 'Go to the home page';
        }
    
  }

  function updateLocationForRound() {
    const locationInfoElement = document.getElementById('location-round-info');
    let innerHTMLContent = "Find: " + current_location.name + "<br>" + referenceLoc.name + " is shown as a reference road in green"
    locationInfoElement.innerHTML = innerHTMLContent;
  
  }

  function closePopup(){

    if (roundNumber === 6) {

      window.location.href = '/';

    }

    greyOutSubmitButton(submit);

    const elem_id = "loc-" + (roundNumber - 1);
    const elem = document.getElementById(elem_id);

    if (distanced_data.found){
      elem.src = '/static/assets/green.png';
    }
    else {

      elem.src = '/static/assets/red.png';

    }
  
    popup.classList.remove('open-popup');
    // map.removeLayer(correct_marker);

    for (const key in currentLocationMapElements){
      if (currentLocationMapElements[key] !== null) {
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

    let map_guess_container = document.getElementById('map-guess-container')
    if (window.innerWidth < 700) {
      map_guess_container.style.display = '';
    }
    map_guess_container.classList.remove('slide-away');

    current_location = locations[roundNumber-1];

    updateLocationForRound();

    resetClock();
    runTimer(300, submit);
  
  }


  reset_sv_button.addEventListener('click', function () {
    updateIframeLocation(streetViewLocation.lat, streetViewLocation.lng);
  }
  )

const next_round_button = document.getElementById('next-round');

next_round_button.addEventListener('click', closePopup)
  

