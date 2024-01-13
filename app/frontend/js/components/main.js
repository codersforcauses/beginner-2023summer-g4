
const correctIcon = L.icon({
    iconUrl: '/static/assets/flag.png',
    iconSize: [38, 50],
    iconAnchor: [27.26, 48],

});

const dropIcon = L.icon({
    iconUrl: '/static/assets/sleuthFlag.png',
    iconSize: [38, 50],
    iconAnchor: [27.26, 48],

});


const userIcon = L.icon({
    iconUrl: '/static/assets/pin_2.png',
    iconSize: [50, 50],
    iconAnchor: [50 / 2, 50],
});

const tips = [
    "Use the compass to figure out which way the roads and streets point (red is North)",
    "Click the Reset Street View button to reset the street view to the original location if you're lost",
    "The Street View may be outdated from Google, so use your knowledge of the area will help you most",
    "Pay attention to street signs, shop names, and any written information that can reveal the location",
    "Explore busy intersections or areas with high foot traffic, popular spots are likely to be nearby",
  ];


export {correctIcon, userIcon, dropIcon, tips};

