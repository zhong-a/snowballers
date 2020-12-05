<template>
    <div id="container">
        <div class="join-make-btns" v-if="user.inteam === '_'">
          <button @click="makeTeamBtnClicked">Make Team</button>
          <button @click="seeTeamsBtnClicked">See Teams</button>
          <button @click="logOut">Log Out</button>
        </div>
        <div v-else-if="user.owner">
          <button @click="showChallengesClicked">Show Challenges</button>
        </div>
        <div class="col1" v-else>
          <h1>Snowballers</h1>
          <p>Welcome to the Snowballers' Snowball Fight Matching App</p>
        </div>
          
    </div>
</template>

<script>
import store from '../../store.js'
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    makeTeamBtnClicked: function() {
      this.$root.$emit("makeTeamBtnClicked");
    },

    seeTeamsBtnClicked: function() {
      this.$root.$emit("seeTeamsBtnClicked");
    },

    logOut: function() {
      console.log("logout button clicked")
      let thisptr = this;
      this.$store.dispatch('logout').then(() => {
        thisptr.$root.$emit("logOutBtnClicked");
      }).catch(err => {
        alert("error with logging out: " + err)
      })
    },

    showChallengesClicked: function() {
      this.$root.$emit("showChallengesBtnClicked");
    },
  },
  created : function () {
    this.user = store.state.userProfile;
    console.log(this.user.inteam)
  }
};
</script>

<style>
#container {
  display: flex;
  flex-direction: column;
  width: 30%;
}
template {
  width: 20%;
}
</style>
