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

function checkStreetViewAvailability(lat, lng) {

    const location = new google.maps.LatLng(lat, lng);

    var locationRequest = 
    { 
        preference: "nearest", 
        radius: 10000, 
        location: location, 
        sources: (isStandardGameMode) ? [google.maps.StreetViewSource.GOOGLE, google.maps.StreetViewSource.OUTDOOR] : [google.maps.StreetViewSource.GOOGLE]
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
            updateIframeLocation(panoramaLat, panoramaLng);
            resolve({ lat: panoramaLat, lng: panoramaLng });
          } else {
            console.log(`Street View is not available anywhere near ${lat},${lng}, retrying...`);
            // let lat_lon_obj;
            // if (isStandardGameMode) {
            //     lat_lon_obj = getRandomCoordinates();
            // } else {
            //     lat_lon_obj = getRandomStreetSleuthCoordinates();
            // }
            // checkStreetViewAvailability(lat_lon_obj.lat, lat_lon_obj.lng);
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

function getRandomStreetSleuthCoordinates(){

    let perthCBD = { 
        minLat: -31.963036,
         maxLat: -31.943482,
         minLng: 115.851513,
         maxLng: 115.870267,
    };


    const randomLat = Math.random() * (perthCBD.maxLat - perthCBD.minLat) + perthCBD.minLat;
    const randomLng = Math.random() * (perthCBD.maxLng - perthCBD.minLng) + perthCBD.minLng;

    return { lat: randomLat, lng: randomLng };
}

function getRandomCoordinates() {
    let rotnest = { minLat: -32.030745,
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
    } 
    else {
        // Choose mainCity 98% of the time
        selectedLocation = mainCity;
    }

    const randomLat = Math.random() * (selectedLocation.maxLat - selectedLocation.minLat) + selectedLocation.minLat;
    const randomLng = Math.random() * (selectedLocation.maxLng - selectedLocation.minLng) + selectedLocation.minLng;

    return { lat: randomLat, lng: randomLng };
}

async function generateNewStreetView() {

    let streetViewLocation = null;
    while (streetViewLocation === null) {
        let lat_lon_obj;
        if (isStandardGameMode) {
            lat_lon_obj = getRandomCoordinates();
        } else {
            lat_lon_obj = getRandomStreetSleuthCoordinates();
        }
        streetViewLocation = await checkStreetViewAvailability(lat_lon_obj.lat, lat_lon_obj.lng);
    }

    console.log("STREETVIEW FOUND: " + streetViewLocation.lat + streetViewLocation.lng);
    return streetViewLocation;
}


//generateNewStreetView();


export {generateNewStreetView};


