async function getLocations(streetViewLocation) {
    const overpassUrl = "https://overpass-api.de/api/interpreter";
    const overpassQuery = `[out:json];(node(around:100,${streetViewLocation.lat},${streetViewLocation.lng})[name]["amenity"];node(around:100,${streetViewLocation.lat},${streetViewLocation.lng})[name]["shop"];way(around:100,${streetViewLocation.lat},${streetViewLocation.lng})[name]["amenity"];relation(around:100,${streetViewLocation.lat},${streetViewLocation.lng})[name]["amenity"];way(around:100,${streetViewLocation.lat},${streetViewLocation.lng})[name]["building"];);out tags geom;`;
    try {
      const response = await fetch(`${overpassUrl}?data=${encodeURIComponent(overpassQuery)}`);
      const data = await response.json();
  
      const LocationsToBeSelected = [];
      const shuffledElements = [...data.elements]; // Create a copy of the elements array
      const uniqueLocs = new Set();
      shuffleArray(shuffledElements);

      for (const loc of shuffledElements) {
        const loc_name = loc.tags.name;
        if (loc_name && !uniqueLocs.has(loc_name)) {
          uniqueLocs.add(loc_name);
          let locations;
          if (loc.hasOwnProperty('geometry')){
            locations = [{name: loc_name, type: 'area', location: loc.bounds, geom: loc.geometry}]
          }
          else{
            locations = [{name: loc_name, type: 'node', location: {lat: loc.lat, lng: loc.lon}}]
          }
          for (const other_loc of shuffledElements) {
            const another_loc_name = other_loc.tags.name;
            if (another_loc_name === loc_name && loc.id !== other_loc.id) {
              if (other_loc.hasOwnProperty('geometry')){
                locations.push({name: another_loc_name, type: 'area', location: other_loc.bounds, geom: other_loc.geometry});
              }
              else{
                locations.push({name: another_loc_name, type: 'node', location: {lat: other_loc.lat, lng: other_loc.lon}});
              }
            }
          }

          LocationsToBeSelected.push(locations);

          if (LocationsToBeSelected.length === 5){break;}
        }
      }
  
      return LocationsToBeSelected;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

export {getLocations};

// export function generateRandomStreetNames(){
//   if (!isStandardGameMode){

//     getStreetNames().then((result) => {
//         console.log("Street names:", result);
//     })
//     .catch((error) => {
//         console.error("Error:", error);
//     });
// }
// }

  