// streetview_checker.js

var streetViewLocation;

function checkStreetViewAvailability(lat, lng) {
    const streetViewService = new google.maps.StreetViewService();
    const location = new google.maps.LatLng(lat, lng);

    streetViewService.getPanorama({ location: location, radius: 10000 }, (data, status) => {
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
    sv.src = `https://www.google.com/maps/embed/v1/streetview?location=${lat}%2C${lng}&key=`;
}

function getRandomCoordinates() {

    const minLat = -32.572409;
    const maxLat = -31.571878;
    const minLng = 115.318021;
    const maxLng = 116.315080;

    const randomLat = Math.random() * (maxLat - minLat) + minLat;
    const randomLng = Math.random() * (maxLng - minLng) + minLng;

    return { lat: randomLat, lng: randomLng };
}

const lat_lon_obj = getRandomCoordinates()

// Check Street View availability for the example coordinates
checkStreetViewAvailability(lat_lon_obj.lat, lat_lon_obj.lng);
