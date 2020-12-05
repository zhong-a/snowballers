<template>
  <div id="create-fight-template">
    <h1 id="menu-title">Create a Fight</h1>

    <div class="menu-option">
      <span class="left">Choose a fight location:</span>
      <span class="right">
        <select v-model="selectedLocation" name="#">
          <option
            v-for="location in fightLocations"
            :value="location"
            v-bind:key="location"
          >
            {{ location }}
          </option>
        </select>
      </span>
    </div>

    <div class="menu-option">
        <span class="left">Choose a fight date:</span>
        <span class="right">
            <input type="date" v-model="fightDate" />
        </span>
    </div>

    <div class="menu-option">
        <span class="left">Choose a fight time:</span>
        <span class="right">
            <input type="time" v-model="fightTime" />
        </span>
    </div>
  </div>
</template>

<script>
import { possibleFightLocations } from "./../map/possibleFightLocations.js";
const locationsArray = Object.keys(possibleFightLocations);


export default {
    data: function(){
        return {
            fightLocations: locationsArray,
            selectedLocation: "",
            fightDate: "",
            fightTime: "",
        }
    }
}
</script>





<style>
.left {
  float: left;
}
.right {
  float: right;
}
.menu-option {
  clear: both;
  float: left;
  width: 100%;
  height: 25px;
}
#create-fight-template {
  float: left;
  width: 350px;
}
</style> 
