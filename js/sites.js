/* Reef Response field sites.
   type: "land" land-based nursery | "water" in-water nursery |
         "primary" primary restoration | "research" research restoration |
         "auxiliary" auxiliary restoration
   spawning: true marks a spawning hub (drawn with a white centre).
   Optional per site, shown in the panel under the map when present:
     photo: "images/site/<file>.jpg" a still of the site
     video360: a YouTube video id for a 360 tour, e.g. "dQw4w9WgXcQ" */
var REEF_SITES = [
  {
    "name": "Center for Marine and Environmental Studies",
    "lat": 18.3401,
    "lng": -64.97655,
    "region": "St. Thomas — South Shore",
    "type": "land",
    "spawning": false
  },
  {
    "name": "Brewers",
    "lat": 18.34459,
    "lng": -64.98359,
    "region": "St. Thomas — South Shore",
    "type": "auxiliary",
    "spawning": false
  },
  {
    "name": "Fortuna",
    "lat": 18.34504,
    "lng": -65.01548,
    "region": "St. Thomas — South Shore",
    "type": "research",
    "spawning": false
  },
  {
    "name": "Artificial Reef",
    "lat": 18.34474,
    "lng": -65.01525,
    "region": "St. Thomas — South Shore",
    "type": "research",
    "spawning": false
  },
  {
    "name": "Perseverance",
    "lat": 18.34944,
    "lng": -64.99454,
    "region": "St. Thomas — South Shore",
    "type": "research",
    "spawning": true
  },
  {
    "name": "Range Cay",
    "lat": 18.33947,
    "lng": -64.97843,
    "region": "St. Thomas — South Shore",
    "type": "water",
    "spawning": true
  },
  {
    "name": "Flat Cay — Leeward",
    "lat": 18.31756,
    "lng": -64.99046,
    "region": "St. Thomas — South Shore",
    "type": "primary",
    "spawning": false
  },
  {
    "name": "Flat Cay — Windward",
    "lat": 18.31715,
    "lng": -64.9887,
    "region": "St. Thomas — South Shore",
    "type": "primary",
    "spawning": false
  },
  {
    "name": "South Capella",
    "lat": 18.26163,
    "lng": -64.87242,
    "region": "St. Thomas — South Shore",
    "type": "research",
    "spawning": false
  },
  {
    "name": "Rupert's Rock",
    "lat": 18.3272,
    "lng": -64.92625,
    "region": "St. Thomas — South Shore",
    "type": "auxiliary",
    "spawning": false
  },
  {
    "name": "Hull Bay",
    "lat": 18.37123,
    "lng": -64.95166,
    "region": "St. Thomas — North Shore",
    "type": "primary",
    "spawning": false
  },
  {
    "name": "Peterborg",
    "lat": 18.37781,
    "lng": -64.93701,
    "region": "St. Thomas — North Shore",
    "type": "auxiliary",
    "spawning": false
  },
  {
    "name": "Stumpy",
    "lat": 18.36427,
    "lng": -65.0075,
    "region": "St. Thomas — North Shore",
    "type": "research",
    "spawning": false
  },
  {
    "name": "Coki",
    "lat": 18.35018,
    "lng": -64.86515,
    "region": "St. Thomas — North Shore",
    "type": "auxiliary",
    "spawning": false
  },
  {
    "name": "Great St. James",
    "lat": 18.30546,
    "lng": -64.82767,
    "region": "East End Cays",
    "type": "water",
    "spawning": false
  },
  {
    "name": "Cow and Calf Rocks",
    "lat": 18.30423,
    "lng": -64.84668,
    "region": "East End Cays",
    "type": "auxiliary",
    "spawning": false
  },
  {
    "name": "Stragglers",
    "lat": 18.30304,
    "lng": -64.83612,
    "region": "East End Cays",
    "type": "auxiliary",
    "spawning": false
  },
  {
    "name": "Lovango",
    "lat": 18.36064,
    "lng": -64.80386,
    "region": "East End Cays",
    "type": "water",
    "spawning": false
  },
  {
    "name": "Henry's Reef",
    "lat": 18.36481,
    "lng": -64.80308,
    "region": "East End Cays",
    "type": "primary",
    "spawning": false
  },
  {
    "name": "Murder Rock",
    "lat": 18.35965,
    "lng": -64.80264,
    "region": "East End Cays",
    "type": "auxiliary",
    "spawning": false
  },
  {
    "name": "Waterlemon Cay",
    "lat": 18.36672,
    "lng": -64.72319,
    "region": "St. John",
    "type": "primary",
    "spawning": false
  },
  {
    "name": "Leinster",
    "lat": 18.36506,
    "lng": -64.72429,
    "region": "St. John",
    "type": "primary",
    "spawning": false
  },
  {
    "name": "Mary Creek",
    "lat": 18.36451,
    "lng": -64.73123,
    "region": "St. John",
    "type": "primary",
    "spawning": false
  },
  {
    "name": "Yawzi Point",
    "lat": 18.31223,
    "lng": -64.76566,
    "region": "St. John",
    "type": "primary",
    "spawning": false
  }
];
