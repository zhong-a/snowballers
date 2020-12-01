<template>
 <div id="container">
   <div id="mapContainer"></div>
 </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
 name: "Map", // Map needs to be capitalized b/c theres already an html element called map
 data() {
   return{
     center: [42.290928, -83.717708], // Pierpont Commons
     currentFightLocations: [
// Hard code some locations into create event to make for easier and more legal location selection

       [42.292149,-83.715727], // North Campus Grove
        [42.289078,-83.709831], // Arborcrest Cemetery
        [42.280617,-83.732652], // Palmer Field
     ],
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
      for (let fightLocation of this.currentFightLocations) {
        L.marker(fightLocation)
          .bindPopup("Hi!")
          .addTo(mapDiv);
        console.log(fightLocation);
      }
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
