// landmark.js

import { generateNewStreetView, updateIframeLocation } from './components/streetview.js';
import { runTimer, endTimer, resetClock, currentTimerID} from './components/timer.js';
import { correctIcon, userIcon, dropIcon, tips } from './components/main.js';
import { loadStreetViewAndMap } from './components/load.js';
import { makeSubmitButtonClickable, greyOutSubmitButton } from './components/submit-button.js';

let map;
let streetViewLocation;
let locations;
let current_location;

let popUpMap;
// let popUpUserMarker;
// let popUpCorrectMarker;
// let line;
let currentLocationMapElements;

let userPickedLocation;
var picked_data;
let distanced_data = { game_mode: 'landmark', data: "found_status", found: null};
let marker;

let scores = [null, null, null, null, null];
let roundNumber = 1;

//const submit_button = document.getElementById('submit-button');

const reset_sv_button = document.getElementById('reset-sv-button');

loadStreetViewAndMap().then(async (result) => {

    if (result) {
      document.title = "PerthPinpoint | Local Landmark";
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
      game_mode: 'landmark',
      data: "picked",
      latitude: Number(e.latlng.lat),
      longitude: Number(e.latlng.lng)
    };

  
    distanced_data = {
      game_mode: 'landmark',
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

function generatePolygon(location){
  const geom = location.geom.map(obj => [obj.lat, obj.lon]);
  return L.polygon(geom, {color: 'red'});
}

function locationPrettyFormat(location_string) {
  const loc = location_string.replaceAll('_', ' ');
  return loc.charAt(0).toUpperCase() + loc.slice(1);
}

function generateEndGameMap() {

  popUpMap = L.map('pop-up-map', {
    // zoomDelta: 0.1,
    zoomSnap: 0,
    wheelDebounceTime: 100
  }).setView([-31.943821, 115.857471], 13);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png", {
    attribution: "\u003ca href=\"https://carto.com/legal/\" target=\"_blank\"\u003e\u0026copy; Carto\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e"
  }).addTo(popUpMap);

  let sleuthDropLocationMarker = L.marker(streetViewLocation, {
    icon: dropIcon
  }).addTo(popUpMap);

  L.circle(streetViewLocation, {radius: 200, color: 'blue', dashArray: '5, 10', fill: false}).addTo(popUpMap);


  popUpMap.doubleClickZoom = false;

  // Function to handle map resizing
  function handleMapResize() {
    popUpMap.invalidateSize();
  }

  setInterval(handleMapResize, 5);
  
}

function updateLocationForRound() {
  const locationInfoElement = document.getElementById('location-round-info');
  let innerHTMLContent = "<strong>Find: " + current_location[0].name + "</strong>";

  let locationInfo = "";

  if (current_location[0].shop !== null) {
    locationInfo += "<br>Shop: " + locationPrettyFormat(current_location[0].shop);
  }

  if (current_location[0].amenity !== null) {
    locationInfo += "<br>Amenity: " + locationPrettyFormat(current_location[0].amenity);
  }

  if (current_location[0].building !== null && current_location[0].building !== 'yes') {
    locationInfo += "<br>Building: " + locationPrettyFormat(current_location[0].building);
  }

  if (current_location[0].street !== null) {
    locationInfo += "<br>Street: " + current_location[0].street;
  }

  if (locationInfo !== "") {
    innerHTMLContent += "<br>" + "Location Info" + locationInfo;
  }

  locationInfoElement.innerHTML = innerHTMLContent;
}


function updatePopUpMap(current_loc) {

  let mapElements = [];

  for (const location of current_loc) {

    let locationElements = {'correct-marker': null, 'user-marker': null, line: null, polygon: null};

    if (location.type === 'node'){
      const popUpCorrectMarker = L.marker(location.location, {icon: correctIcon}).addTo(popUpMap);
      locationElements['correct-marker'] = popUpCorrectMarker;
      if (userPickedLocation === undefined) {
        popUpMap.setView(location.location, 18);
      }
      else{
        let bounds = L.latLngBounds(userPickedLocation, location.location).pad(0.19);
        popUpMap.fitBounds(bounds);
        const popUpUserMarker = L.marker(userPickedLocation, {icon: userIcon}).addTo(popUpMap);
        locationElements['user-marker'] = popUpUserMarker;

        const line = L.polyline([location.location, userPickedLocation], {
          color: 'blue',
          dashArray: '5, 10', // Adjust the dash pattern (5 pixels dashed, 10 pixels gap)
          weight: 2, // Adjust the line weight
        }).addTo(popUpMap);

        locationElements['line'] = line;
      }
    }
    else{
      const currentLocationPolygon = generatePolygon(location);
      currentLocationPolygon.addTo(popUpMap);
      locationElements['polygon'] = currentLocationPolygon;
      const polyCentre = currentLocationPolygon.getCenter();
      const popUpCorrectMarker = L.marker(polyCentre, {icon: correctIcon}).addTo(popUpMap);
      locationElements['correct-marker'] = popUpCorrectMarker;

      if (userPickedLocation === undefined) {
        popUpMap.fitBounds(currentLocationPolygon.getBounds(), 18);
      }
      else{

        let bounds = L.latLngBounds(userPickedLocation, polyCentre).pad(0.3);
        popUpMap.fitBounds(bounds);
        const popUpUserMarker = L.marker(userPickedLocation, {icon: userIcon}).addTo(popUpMap);
        locationElements['user-marker'] = popUpUserMarker;

        const line = L.polyline([polyCentre, userPickedLocation], {
          color: 'blue',
          dashArray: '5, 10', // Adjust the dash pattern (5 pixels dashed, 10 pixels gap)
          weight: 2, // Adjust the line weight
        }).addTo(popUpMap);

        locationElements['line'] = line;
      }
    }

    mapElements.push(locationElements);
  }
  return mapElements;
}


function checkIfLocationIsFound(locations){
  for (const location of locations) {
    if (location.type === 'node'){
        if (userPickedLocation.distanceTo(location.location) <= 50){
            return true;
        }
    }
    else{
      let currentLocationPolygon = generatePolygon(location);
      if (currentLocationPolygon.contains(userPickedLocation)){
        return true;
      }
    }
  }
  return false;
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

    currentLocationMapElements = updatePopUpMap(current_location);

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
          pop_up_message.innerHTML = 'You did not find the right location!'
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
          pop_up_score.textContent = tips[getRandomInt(tips.length-1)];
        }
        else if (distanced_data.found === null){
          pop_up_score.innerHTML = 'Check the map to see where the location was';
        }

        if (roundNumber === 5) {
          document.getElementById('next-round').innerHTML = 'Go to the home page';
        }
    
  }

  function closePopup(){

    if (roundNumber === 6) {

      window.location.href = '/';

    }



    greyOutSubmitButton(submit);
  
    popup.classList.remove('open-popup');

    for (const location of currentLocationMapElements){
      for (const key in location){
        if (location[key] !== null) {
          popUpMap.removeLayer(location[key]);
        }
      }
    }

    if (marker !== undefined){
      map.removeLayer(marker);
    }
  
    marker = undefined;
    userPickedLocation = undefined;
  
    const roundNoElements = document.getElementsByClassName('round-no.');
    for (let i = 0; i < roundNoElements.length; i++) {
      roundNoElements[i].innerHTML = "<strong>Round: " +  roundNumber +"</strong>";
    }

    let map_guess_container = document.getElementById('map-guess-container')
    if (window.innerWidth < 700) {
      map_guess_container.style.display = '';
    }
    map_guess_container.classList.remove('slide-away');

    document.getElementById('location-for-round-container').classList.remove('slide-away');

    current_location = locations[roundNumber-1];

    updateLocationForRound();

    resetClock();
    
    runTimer(1000);
  
  }


  reset_sv_button.addEventListener('click', function () {
    updateIframeLocation(streetViewLocation.lat, streetViewLocation.lng);
  }
  )

const next_round_button = document.getElementById('next-round');

next_round_button.addEventListener('click', closePopup)
  

