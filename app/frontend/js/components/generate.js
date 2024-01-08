// This function generates 5 locations, based on the street view location.
// In some cases more than one franchise is located within the 150 radius, so we need to ensure
// that the player gets it correct if they choose either one of the correct locations.
// This is why a location is stored as an array as there may be more than one.

const normal = ["motorway", "primary", "secondary", "trunk"];

const hard =  [
  ...normal,
  "living_street",
  "pedestrian",
  "residential",
  "service",
  "steps",
  "unclassified",
  "cycleway", 
  "tertiary"
];

const highwayRegex = `^(${easy.join("||")})$`;

const overpassUrl = "https://overpass-api.de/api/interpreter";





async function getLocations(streetViewLocation) {
    const overpassQuery = `[out:json];(node(around:150,${streetViewLocation.lat},${streetViewLocation.lng})[name]["amenity"];node(around:150,${streetViewLocation.lat},${streetViewLocation.lng})[name]["shop"];way(around:150,${streetViewLocation.lat},${streetViewLocation.lng})[name]["amenity"];relation(around:150,${streetViewLocation.lat},${streetViewLocation.lng})[name]["amenity"];way(around:150,${streetViewLocation.lat},${streetViewLocation.lng})[name]["building"];);out tags geom;`;
    console.log(overpassQuery);
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
            locations = [{name: loc_name, 
              type: 'area', 
              location: loc.bounds, 
              geom: loc.geometry,
              shop: loc.tags.hasOwnProperty('shop') ? loc.tags.shop : null,
              amenity: loc.tags.hasOwnProperty('amenity') ? loc.tags.amenity : null,
              building: loc.tags.hasOwnProperty('building') ? loc.tags.building : null,
              street: loc.tags.hasOwnProperty('addr:street') ? loc.tags['addr:street'] : null,}]
          }
          else{
            locations = [{
              name: loc_name,
              type: 'node',
              location: { lat: loc.lat, lng: loc.lon },
              shop: loc.tags.hasOwnProperty('shop') ? loc.tags.shop : null,
              amenity: loc.tags.hasOwnProperty('amenity') ? loc.tags.amenity : null,
              building: loc.tags.hasOwnProperty('building') ? loc.tags.building : null,
              street: loc.tags.hasOwnProperty('addr:street') ? loc.tags['addr:street'] : null,
          }];
          }
          for (const other_loc of shuffledElements) {
            const another_loc_name = other_loc.tags.name;
            if (another_loc_name === loc_name && loc.id !== other_loc.id) {
              if (other_loc.hasOwnProperty('geometry')){
                locations.push({name: another_loc_name, 
                  type: 'area', 
                  location: other_loc.bounds, 
                  geom: other_loc.geometry,
                  shop: loc.tags.hasOwnProperty('shop') ? loc.tags.shop : null,
                  amenity: loc.tags.hasOwnProperty('amenity') ? loc.tags.amenity : null,
                  building: loc.tags.hasOwnProperty('building') ? loc.tags.building : null,
                  street: loc.tags.hasOwnProperty('addr:street') ? loc.tags['addr:street'] : null,});
              }
              else{
                locations.push({name: another_loc_name, 
                  type: 'node', 
                  location: {lat: other_loc.lat, lng: other_loc.lon},
                  shop: loc.tags.hasOwnProperty('shop') ? loc.tags.shop : null,
                  amenity: loc.tags.hasOwnProperty('amenity') ? loc.tags.amenity : null,
                  building: loc.tags.hasOwnProperty('building') ? loc.tags.building : null,
                  street: loc.tags.hasOwnProperty('addr:street') ? loc.tags['addr:street'] : null,});
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

async function getRoadsAndStreets(){

  const overpassQuery = `way(around:2000, -31.960717, 115.857390)[highway~"${highwayRegex}"][name];out tags geom;`

  try {
    const response = await fetch(`${overpassUrl}?data=${encodeURIComponent(overpassQuery)}`);
    const data = await response.json();

    const roads = [];

    for (const road_data of data.elements) {
      const road_name = road_data.tags.name;

      const road = {
        name: road_name,
        geom: road_data.geometry,
      }

      for (const other_road_data of data.elements) {
        const other_road_name = other_road_data.tags.name;
        if (other_road_name === road_name && road_data.id !== other_road_data.id) {
          road.geom.concat(other_road_data.geometry);
        }
      }
      roads.push(road);
    }

    return roads;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }

}

export {getLocations, getRoadsAndStreets};
  