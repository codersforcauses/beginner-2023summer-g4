// streetview_checker.js

// function checkStreetViewAvailability(lat, lng) {

//     console.log("TEST TEST!");
//     const streetViewService = new google.maps.StreetViewService();
//     const location = new google.maps.LatLng(lat, lng);

//     streetViewService.getPanorama({ preference: "nearest", radius: 15000, location: location, sources: [google.maps.StreetViewSource.GOOGLE, google.maps.StreetViewSource.OUTDOOR]}, (data, status) => {
//         if (status === google.maps.StreetViewStatus.OK) {
//             const panoramaLocation = data.location.latLng;
//             const panoramaLat = panoramaLocation.lat();
//             const panoramaLng = panoramaLocation.lng();
//             streetViewLocation = { lat: panoramaLat, lng: panoramaLng };
//             console.log(`Street View is available at ${panoramaLat},${panoramaLng}`);
//             updateIframeLocation(panoramaLat, panoramaLng);
//         } else {
//             console.log(`Street View is not available anywhere near ${lat},${lng}, retrying...`);
//             let lat_lon_obj;
//             if (isStandardGameMode) {
//                 lat_lon_obj = getRandomCoordinates();
//             } else {
//                 lat_lon_obj = getRandomStreetSleuthCoordinates();
//             }
//             checkStreetViewAvailability(lat_lon_obj.lat, lat_lon_obj.lng);
//         }
//     });
// }





const mainCityPolygon = L.polygon([
  [-32.515434, 115.704604],
  [-32.543877, 115.677171],
  [-32.562313, 115.704233],
  [-32.554814, 115.739082],
  [-32.523717, 115.769666],
  [-32.494642, 115.797471],
  [-32.419567, 115.836397],
  [-32.378092, 115.853821],
  [-32.336442, 115.865684],
  [-32.308018, 115.887338],
  [-32.312633, 115.962443],
  [-32.31044, 116.014344],
  [-32.270482, 116.021759],
  [-32.213728, 116.03251],
  [-32.159763, 116.04808],
  [-32.0869, 116.047319],
  [-31.986544, 116.043053],
  [-31.92501, 116.06225],
  [-31.848034, 116.064383],
  [-31.825382, 115.97906],
  [-31.773715, 115.894804],
  [-31.715668, 115.847876],
  [-31.646876, 115.759651],
  [-31.662044, 115.67989],
  [-31.781857, 115.704497],
  [-31.882063, 115.721467],
  [-31.933925, 115.727407],
  [-32.04979, 115.712134],
  [-32.175563, 115.727407],
  [-32.298294, 115.683708],
  [-32.516788, 115.704073]
]);

function getRandomPointInBoundingBox(bounds) {
  var randomLat = bounds.getSouth() + Math.random() * (bounds.getNorth() - bounds.getSouth());
  var randomLng = bounds.getWest() + Math.random() * (bounds.getEast() - bounds.getWest());
  return {lat: randomLat, lng: randomLng};
}

function getRandomPointInPolygon(polygon) {
  var bounds = polygon.getBounds();
  var randomPoint = getRandomPointInBoundingBox(bounds);

  while (!polygon.contains(randomPoint)) {
      randomPoint = getRandomPointInBoundingBox(bounds);
  }

  return randomPoint;
}

function checkStreetViewAvailability(lat, lng) {

    const location = new google.maps.LatLng(lat, lng);

    var radius = (game_mode === "city" || game_mode === "sleuth") ? 2000 : 15;
    var sources = (game_mode === "city") ? ['google', 'outdoor'] : ['google'];

    var locationRequest = { 
        preference: "nearest", 
        radius: radius, 
        location: location, 
        sources: sources
    };
  
    // Return a Promise that resolves with StreetViewResponse
    return new Promise(function (resolve, reject) {
      // Make sure the Google Maps JavaScript API is loaded before calling getPanorama
      if (google && google.maps && google.maps.StreetViewService) {
        var streetViewService = new google.maps.StreetViewService();
        streetViewService.getPanorama(locationRequest, function (panoramaData, status) {
          if (status === google.maps.StreetViewStatus.OK) {
            const panoramaLocation = panoramaData.location.latLng;
            const panoramaLat = panoramaLocation.lat();
            const panoramaLng = panoramaLocation.lng();
            //updateIframeLocation(panoramaLat, panoramaLng);
            resolve({ lat: panoramaLat, lng: panoramaLng });
          } else {
            console.log(`Street View is not available anywhere near ${lat},${lng}, retrying...`);
            resolve(null);
          }
        });
      } else {
        // Google Maps API is not loaded
        reject("Google Maps API is not loaded");
      }
    });
  }


function updateIframeLocation(lat, lng) {
    const sv = document.getElementById('sv-iframe');
    sv.src = `https://www.google.com/maps/embed/v1/streetview?location=${lat}%2C${lng}&key=AIzaSyDsZY2whhB9VouVJ-OJ9rNsdb19PddEqBc`;
}

function getRandomLandmarkCoordinates(){

    const perthCBD = { 
        minLat: -31.963036,
         maxLat: -31.943482,
         minLng: 115.851513,
         maxLng: 115.870267,
    };

    const freo = {
        minLat: -32.061772,
        maxLat: -32.043222,
        minLng: 115.737333,
        maxLng: 115.756235,
    };

    const selectedLocation = (Math.random() < 0.5) ? perthCBD : freo;


    const randomLat = Math.random() * (selectedLocation.maxLat - selectedLocation.minLat) + selectedLocation.minLat;
    const randomLng = Math.random() * (selectedLocation.maxLng - selectedLocation.minLng) + selectedLocation.minLng;

    return { lat: randomLat, lng: randomLng };
}

function getRandomCoordinates() {
  let rotnest = {
      minLat: -32.030745,
      maxLat: -31.989988,
      minLng: 115.442019,
      maxLng: 115.561232,
  };

  let mainCity = {
      minLat: -32.676015,
      maxLat: -31.636557,
      minLng: 115.665061,
      maxLng: 116.082104,
  };

  const randomNumber = Math.random();
  let selectedLocation;

  if (randomNumber < 0.02) {
      // Choose Rottnest 2% of the time
      selectedLocation = rotnest;
  } else {
      selectedLocation = mainCity;

      const areaLoc = Math.random();

      if (areaLoc < 0.8) {
        const loc = getRandomPointInPolygon(mainCityPolygon);
        console.log("THE LOCATION IS INSIDE POLYGON");
        return loc;
      }
      console.log("NOT IN 80%");

  }

  const randomLat = Math.random() * (selectedLocation.maxLat - selectedLocation.minLat) + selectedLocation.minLat;
  const randomLng = Math.random() * (selectedLocation.maxLng - selectedLocation.minLng) + selectedLocation.minLng;

  return { lat: randomLat, lng: randomLng };
}

async function generateNewStreetView() {

    let streetViewLocation = null;
    while (streetViewLocation === null) {
        let lat_lon_obj;
        if (game_mode === "city" || game_mode === "sleuth") {
            lat_lon_obj = getRandomCoordinates();
        } else {
            lat_lon_obj = getRandomLandmarkCoordinates();
        }
        streetViewLocation = await checkStreetViewAvailability(lat_lon_obj.lat, lat_lon_obj.lng);
    }

    return streetViewLocation;
}



export {generateNewStreetView, updateIframeLocation};


