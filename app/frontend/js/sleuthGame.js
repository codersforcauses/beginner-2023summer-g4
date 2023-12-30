import { generateNewStreetView } from './streetview.js';
import { runTimer, endTimer, currentTimerID} from './timer.js';
import { correctIcon, userIcon } from './main.js';
import { loadStreetViewAndMap } from './loadGame.js';

let map;
let streetViewLocation;
let locations;
let current_location;

let popUpMap;

let userPickedLocation;
var picked;
var distanced;
let marker;

var totalScore = 0;
var roundNumber = 1;

loadStreetViewAndMap().then(async (result) => {

    if (result) {
      map = result.map;
      streetViewLocation = result.streetViewLocation;
      locations = await result.locationsSelected;
      console.log("Locations:", locations);
      current_location = locations[0];
      console.log("FIND: "+ current_location[0].name);
      runTimer(360, submit);
      // let map_guess = document.getElementById('map-guess-container');
      // map_guess.style.height = '95%';
      // map_guess.style.width = '43%';

      startGame();
    } else {
      console.error('Failed to load street view and map.');
    }
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

        let score = data['score'];

        totalScore += ((score == -1) ? 0 : score);

        let popup = document.getElementById('popup');

        let pop_up_message = document.getElementById('popup-message');

        let pop_up_score = document.getElementById('popup-score');

        let popupElement = document.querySelector('.score-for-a-round-popup');
        let pop_up_button = popupElement.querySelector('button');

        //correct_marker = L.marker(streetViewLocation, {icon: correctIcon}).addTo(map);


        if (score >= 500) {
        pop_up_message.innerHTML = 'Nice! You found the exact location'
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
        pop_up_message.innerHTML = "You did not submit a guess!"
        popupElement.style.borderColor = '#ff0000';
        popupElement.style.background = '#ffe7e7';
        pop_up_button.style.background = '#ff0000';
        }
        
        pop_up_score.innerHTML = 'You got ' + ((score == -1) ? 0 : score) + ' points';

        if (roundNumber === 1){
            generateEndGameMap();
        }
    
        updatePopUpMap();
    
        popup.classList.add('open-popup');
        roundNumber++;
    
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function generateGeometry(location){

    

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

function startGame(){
    map.on('click', function(e) {

      console.log(current_location.location);

    if (marker !== undefined){
      map.removeLayer(marker);
    }
  
    userPickedLocation = e.latlng;
  
    marker = L.marker(e.latlng, {icon: userIcon}).addTo(map);
  
    let picked_data = {
      type: 'sleuth',
      data: String("picked"),
      latitude: Number(e.latlng.lat),
      longitude: Number(e.latlng.lng)
    };
  
    picked = JSON.stringify(picked_data);
  
    let distanced_data = {
      type: 'sleuth',
      data: String("distanced"),
      distance: Number(e.latlng.distanceTo(current_location[0].location))
    };
  
    distanced = JSON.stringify(distanced_data);
  
  })
}

function submit() {
    endTimer(currentTimerID);
  
  
    if (marker === undefined){
      let distanced_data = {
        type: 'sleuth',
        data: String("distanced"),
        distance: -1
      };
    
      distanced = JSON.stringify(distanced_data);
    }
  
    if (roundNumber === 5) {
      // handle end game stuff
      // send json to backend, to add to db
    }
  
    document.getElementById('map-guess-container').classList.add('slide-away');
  
    console.log(`picked: ${picked} | distance: ${distanced}`);
    //post_data(picked);
    post_data(distanced);
  
  }

  async function closePopup(){

    streetViewLocation = await generateNewStreetView();

    let sleuthDropLocationMarker = L.marker(streetViewLocation, {
      icon: sleuthIcon
    }).addTo(map);
  
  
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

const submit_button = document.getElementById('submit-button');

const next_round_button = document.getElementById('next-round');

next_round_button.addEventListener('click', closePopup)

submit_button.addEventListener('click', submit)
  