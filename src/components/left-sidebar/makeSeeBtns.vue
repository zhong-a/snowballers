<template>
    <div id="container">
        <div class="join-make-btns" v-if="teamless === true">
          <button @click="makeTeamBtnClicked">Make Team</button>
          <button @click="seeTeamsBtnClicked">See Teams</button>
        </div>
        <div v-else-if="user.owner === true">
          <div v-if="challengedATeam === true">
            <h1>You challenged {{ teamToFight }}! Have fun!</h1>
          </div>
          <div v-else>
            <button @click="showChallengesClicked">Show Challenges</button>
          </div>
        </div>
        <div class="col1" v-else>
          <h1>Snowballers</h1>
          <p>Welcome to the Snowballers' Snowball Fight Matching App</p>
        </div>
        <button @click="logOut">Log Out</button>
    </div>
</template>

<script>
import store from '../../store.js'
export default {
  data() {
    return {
      user: {},
      teamless: true,
      challengedATeam: false,
      teamToFight: ""
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
    console.log(this.user.inteam);
    this.teamless = !(this.user.hasOwnProperty("inteam"));
    this.challengedATeam = this.user.hasOwnProperty("challenging");
    if (this.challengedATeam === true) {
      let team = this.$store.state.userProfile.challenging;
      this.teamToFight = team;
    }
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
