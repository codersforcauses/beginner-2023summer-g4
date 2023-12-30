import { getLocations } from "./generate.js";
import { generateNewStreetView } from "./streetview.js";
import { sleuthIcon } from './main.js';

// async function selectedLocations(streetViewLocation) {
//     try {
//       const locations = await getLocations(streetViewLocation);
//     } catch (error) {
//       console.error("Error in example:", error);
//     }
// }

async function loadStreetViewAndMap() {

  let streetViewLocation = null;
  let map = null;
  let locationsSelected = null;


  try {
    const result = await generateNewStreetView();

    if (result !== null) {
      streetViewLocation = result;
      locationsSelected = getLocations(streetViewLocation);

      if (isStandardGameMode) {
        map = L.map('map', {
          zoomDelta: 0.1,
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
          zoomDelta: 0.1,
          zoomSnap: 0,
          wheelDebounceTime: 100
        }).setView([-31.943821, 115.857471], 13);

        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png", {
          attribution: "\u003ca href=\"https://carto.com/legal/\" target=\"_blank\"\u003e\u0026copy; Carto\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e"
        }).addTo(map);

     //   let sleuthDropLocationMarker = L.marker(streetViewLocation, {
      //    icon: sleuthIcon
       // }).addTo(map);
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



  