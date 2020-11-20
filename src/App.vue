<template>
  <div id="app">
    <div id="sidebar-container">
      
      <div id="login-div" v-if="showLogin">
        <loginfb />
      </div>

      <makeSeeTeamsBtns v-if="showMakeJoinTeamBtns" />

      
    </div>
    <main>
      
      <div id="create-team-div" v-if="showCreateTeam">
        <createTeam v-on:team-created="teamCreated()"/>
      </div>
      <div id="team-menu-div" v-if="showTeamMenu">
        <teamsMenu />
      </div>
    </main>
  </div>
</template>

<script>
import loginfb from "./components/login/login-firebase.vue";
import login from "./components/login/login.vue";
import leftSidebar from "./components/left-sidebar/leftSidebar.vue";
import makeSeeTeamsBtns from "./components/left-sidebar/makeSeeTeamsBtns.vue";
import createTeam from "./components/createTeam/createTeam.vue";
import teamsMenu from "./components/teams-menu/teamsMenu.vue";
const regeneratorRuntime = require("regenerator-runtime");

export default {
  name: "app",
  data() {
    return {
      showLogin: true,
      //showSidebar: true,// do we ever hide the sidebar?
      showCreateTeam: true,
      showTeamMenu: true,
      showMakeJoinTeamBtns: true,
    };
  },
  components: {
    login,
    loginfb,
    leftSidebar,
    makeSeeTeamsBtns,
    createTeam,
    teamsMenu,
  },
  methods: {
    logIn: function() {
      this.showMakeJoinTeamBtns = true;

      this.showLogin = false;
      this.showCreateTeam = false;
      this.showTeamMenu = false;
    },

    createTeamFunc: function() {
      this.showCreateTeam = false;;
      console.log("k");
    },

    teamsMenuFunc: function() {},
    teamCreated: function() {},
    teamJoined: function() {}

  },
  mounted: function() {

    this.$root.$on("makeTeamBtnClicked", () => {
      this.createTeamFunc();
    })

  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

/***********/

#app {
  background-color: AliceBlue;
  display: grid;
  grid-template-columns: auto auto; /* make 2 columns */
}

</style>
