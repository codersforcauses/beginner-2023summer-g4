import { getLocations, getRoadsAndStreets } from "./generate.js";
import { generateNewStreetView, updateIframeLocation } from "./streetview.js";
import { dropIcon } from './main.js';

async function generateLandmarksUntilLength5() {
  let locationsSelected = [];
  let streetViewLocation; 

  while (locationsSelected.length < 5) {
    console.log("LESS THAN 5!");
    const result = await generateNewStreetView();

    if (result !== null) {
      streetViewLocation = result;
      locationsSelected = await getLocations(streetViewLocation);
    }
  }

  console.log("Locations:", locationsSelected);
  
  return {streetViewLocation, locationsSelected};
}

async function generateRoadsUntilLength6() {
  let locationsSelected = [];
  let streetViewLocation; 

  while (locationsSelected.length < 6) {
    console.log("LESS THAN 6!");
    const result = await generateNewStreetView();

    if (result !== null) {
      streetViewLocation = result;
      locationsSelected = await getRoadsAndStreets(streetViewLocation);
    }
  }

  console.log("Roads:", locationsSelected);

  const referenceLoc = locationsSelected[5];
  locationsSelected = locationsSelected.slice(0, 5);
  
  return {streetViewLocation, locationsSelected, referenceLoc};
}

async function loadStreetViewAndMap() { 

  let streetViewLocation = null;
  let map = null;
  let locationsSelected = null;
  let referenceLoc = null;

  const boundsRotnest = [[-32.030745, 115.442019], [-31.989988, 115.561232]];
  const boundsCity = [[-32.676015, 115.665061], [-31.636557, 116.082104]];

  try {

    if (game_mode === "landmark" || game_mode === "sleuth"){
      let result;

      if (game_mode === "landmark"){
        result = generateLandmarksUntilLength5();
      }
      else if (game_mode == "sleuth"){
        result = generateRoadsUntilLength6();
      }

      streetViewLocation = (await result).streetViewLocation;
      locationsSelected = (await result).locationsSelected;
      referenceLoc = (await result).referenceLoc;

    }
    else {
      streetViewLocation = await generateNewStreetView();
    }

    if (streetViewLocation !== null) {
      updateIframeLocation(streetViewLocation.lat, streetViewLocation.lng);

      if (game_mode === "city") {
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


        // create a rectangle boundary
        L.rectangle(boundsCity, {color: "blue", weight: 2, opacity: 0.4, fill: false, dashArray: '5, 10' }).addTo(map);
        L.rectangle(boundsRotnest, {color: "blue", weight: 2, opacity: 0.4, fill: false, dashArray: '5, 10' }).addTo(map);

      } else {
        map = L.map('map', {
          // zoomDelta: 0.1,
          zoomSnap: 0,
          wheelDebounceTime: 100
        }).setView(streetViewLocation, (game_mode === "landmark") ? 16 : 12.5);

        if (game_mode === "landmark"){
          L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}@2x.png", {
            attribution: "\u003ca href=\"https://carto.com/legal/\" target=\"_blank\"\u003e\u0026copy; Carto\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
          }).addTo(map);
        }
        else if (game_mode === "sleuth"){
          L.tileLayer("https://api.maptiler.com/maps/satellite/{z}/{x}/{y}@2x.jpg?key=yKxYycTR24wt9spqlP62", {
          tileSize: 512,
          zoomOffset: -1,
          }).addTo(map);
          L.rectangle(boundsCity, {color: "pink", weight: 2, opacity: 0.5, fill: false, dashArray: '5, 10' }).addTo(map);
          L.rectangle(boundsRotnest, {color: "pink", weight: 2, opacity: 0.5, fill: false, dashArray: '5, 10' }).addTo(map);
          L.polyline(referenceLoc.geom, {color: '#37DB5E', weight: 7}).addTo(map);
        }

       let sleuthDropLocationMarker = L.marker(streetViewLocation, {
         icon: dropIcon
       }).addTo(map);

       L.circle(streetViewLocation, {radius: (game_mode === "landmark") ? 200 : 2250, color: (game_mode === "landmark") ? 'blue' : '#00eeff', dashArray: '5, 10', fill: false}).addTo(map);

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




  return {map, streetViewLocation, locationsSelected, referenceLoc};
}

  export {loadStreetViewAndMap};



  