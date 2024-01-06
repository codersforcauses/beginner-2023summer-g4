import { getLocations } from "./generate.js";
import { generateNewStreetView, updateIframeLocation } from "./streetview.js";
import { dropIcon } from './main.js';

// async function selectedLocations(streetViewLocation) {
//     try {
//       const locations = await getLocations(streetViewLocation);
//     } catch (error) {
//       console.error("Error in example:", error);
//     }
// }

async function generateLocationsUntilLength5() {
  let locationsSelected = [];
  let streetViewLocation; 

  while (locationsSelected.length < 5) {
    console.log("LESS THAN 5!");
    const result = await generateNewStreetView();

    if (result !== null) {
      streetViewLocation = result;
      updateIframeLocation(streetViewLocation.lat, streetViewLocation.lng);
      locationsSelected = await getLocations(streetViewLocation);
    }
  }
  

  return {streetViewLocation, locationsSelected};
}

async function loadStreetViewAndMap() {

  

  let streetViewLocation = null;
  let map = null;
  let locationsSelected = null;


  try {

    let result;

    if (game_mode === "landmark"){
      result = generateLocationsUntilLength5();
      streetViewLocation = (await result).streetViewLocation;
      locationsSelected = (await result).locationsSelected;
    }
    else{
      result = await generateNewStreetView();
      streetViewLocation = result;
    }
    
    if (result !== null) {

      if (isStandardGameMode) {
        map = L.map('map', {
          // zoomDelta: 0.1,
          zoomSnap: 0,
          wheelDebounceTime: 100
        }).setView([-31.997564, 115.824893], 9);

        L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}@2x.png?key=yKxYycTR24wt9spqlP62', {
          tileSize: 512,
          zoomOffset: -1,
          minZoom: 1,
          crossOrigin: true,
        }).addTo(map);
      } else {
        map = L.map('map', {
          // zoomDelta: 0.1,
          zoomSnap: 0,
          wheelDebounceTime: 100
        }).setView(streetViewLocation, 15);

        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png", {
          attribution: "\u003ca href=\"https://carto.com/legal/\" target=\"_blank\"\u003e\u0026copy; Carto\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e"
        }).addTo(map);

       let sleuthDropLocationMarker = L.marker(streetViewLocation, {
         icon: dropIcon
       }).addTo(map);

       L.circle(streetViewLocation, {radius: 200, color: 'blue', dashArray: '5, 10', fill: false}).addTo(map);


      }

      map.doubleClickZoom = false;

      // Function to handle map resizing
      function handleMapResize() {
        map.invalidateSize();
      }

      setInterval(handleMapResize, 5);
    } else {
      console.error('Error generating street view.');
    }
  } catch (error) {
    console.error('Error:', error);
  }

  return {map, streetViewLocation, locationsSelected};
}

  export {loadStreetViewAndMap};



  