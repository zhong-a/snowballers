<template>
 <div id="container">
   <div id="mapContainer"></div>
 </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { possibleFightLocations } from "./possibleFightLocations"; // change this file path if needed

export default {
 name: "Map", // Map needs to be capitalized b/c theres already an html element called map
 data() {
   return{
     center: [42.290928, -83.717708], // Pierpont Commons

      // Hard code some locations into create event to make for easier and more legal location selection
     fights: [
        {
         team1: "Alphas",
         team2: "Omegas",
         location: "North Campus Grove", 
         time: "21:00",
         date: "2020-12-03",
        },
        {
         team1: "Surfers",
         team2: "Bikers",
         location: "North Campus Grove", 
         time: "15:00",
         date: "2017-06-01",
        },
        {
         team1: "Couzens",
         team2: "Alice",
         location: "Palmer Field", 
         time: "10:00",
         date: "2017-06-01",
        },
        {
         team1: "Gold",
         team2: "Silver",
         location: "The Diag", 
         time: "10:00",
         date: "2017-06-01",
        },
     ],

     coordinates: possibleFightLocations,
   }
 },

 methods: {
   setupLeafletMap: function () {

     //## make base map
     const mapDiv = L.map("mapContainer").setView(this.center, 13);
     
     L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,

          /* Go to mapbox account and make a new access token if needed: */
          accessToken: "pk.eyJ1IjoidmFsbGVta3IiLCJhIjoiY2tpNmYyM3cyMmdycTJ3cDVyeG5jaTU0ZSJ9.oiAw_f4j5OzGAPXfMuHUxA"
      }).addTo(mapDiv);


      //## add current fight location markers

      // the message to display when each location marker is clicked (list of all fights at that location)
      const locationPopupMsgs = {};

      // create the popup messages for each location
      for (let fight of this.fights) {
        let { location } = fight;
        
        // initialize "" if location not already existing
        if (! (location in locationPopupMsgs)) {
          locationPopupMsgs[location] = "";
        }

        locationPopupMsgs[location] += `${fight.team1} vs ${fight.team2}<br>${fight.time}<br>${fight.date}<br><br>`;
      }

      //add markers with their correponding popup messages to map
      for (let location in locationPopupMsgs) {
        let msg = locationPopupMsgs[location];

        let coordinates = this.coordinates[location];


        let greenIcon = new L.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        
        L.marker(coordinates, this.getIconOptions(location))
          .bindPopup(msg)
          .addTo(mapDiv)
          ;
      }
   },

   isThereAFightHereRightNow: function(location) {

     for (const fight of this.fights) {
       const fightTime = fight.time;

       const currentTime = (new Date());

       // todo

       /*

       if fightTime <= currentTime && currentTime <= fightTime:
          reuturn True
        else:
          return False

Blue markers by default, yellow for ongoing fight
          */
     }

     // return True if theres a current fight
     // False otherwise
     return !true;
   },

    // icon colors:
    // https://github.com/pointhi/leaflet-color-markers
   getIconOptions: function(location) {
     const iconColor = (this.isThereAFightHereRightNow(location)) ? "red" : "grey";
     
     let coloredIcon = new L.Icon({
          iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${iconColor}.png`,
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

      return (
        {icon: coloredIcon}
      )
   },
 },

 mounted() {
   this.setupLeafletMap();
 },
 
};
</script>

<style scoped>
#mapContainer {
 width: 80vw;
 height: 100vh;
}
</style>
