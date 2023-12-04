// streetview_checker.js

var streetViewLocation;

function checkStreetViewAvailability(lat, lng) {
    const streetViewService = new google.maps.StreetViewService();
    const location = new google.maps.LatLng(lat, lng);

    streetViewService.getPanorama({ radius: 30000, location: location, sources: [google.maps.StreetViewSource.GOOGLE, google.maps.StreetViewSource.OUTDOOR]}, (data, status) => {
        // preference: "nearest" we could use this

        if (status === google.maps.StreetViewStatus.OK) {
    
            const panoramaLocation = data.location.latLng; // Extracting panorama location
            const panoramaLat = panoramaLocation.lat();
            const panoramaLng = panoramaLocation.lng();
            streetViewLocation = {lat: panoramaLat, lng: panoramaLng};
            console.log(`Street View is available at ${panoramaLat},${panoramaLng}`);
            updateIframeLocation(panoramaLat, panoramaLng);

        } else {
            console.log(`Street View is not available anywhere near ${lat},${lng}, retrying...`);
            const lat_lon_obj = getRandomCoordinates()
            checkStreetViewAvailability(lat_lon_obj.lat, lat_lon_obj.lng);
        }
    });
}


function updateIframeLocation(lat, lng) {
    const sv = document.getElementById('sv-iframe');
    sv.src = `https://www.google.com/maps/embed/v1/streetview?location=${lat}%2C${lng}&key=AIzaSyDsZY2whhB9VouVJ-OJ9rNsdb19PddEqBc`;
}

function getRandomCoordinates() {
    rotnest = { minLat: -32.030745,
        maxLat: -31.989988,
        minLng: 115.442019,
        maxLng: 115.561232,
    };

    mainCity = { minLat: -32.676015,
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


const lat_lon_obj = getRandomCoordinates()

// Check Street View availability for the example coordinates
checkStreetViewAvailability(lat_lon_obj.lat, lat_lon_obj.lng);
