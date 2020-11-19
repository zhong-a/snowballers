<template>
  <div id="app">
    <div v-if="showSidebar">
      <leftSidebar />
    </div>

    <div id="login-div" v-if="showLogin">
      <loginfb />
      <login />
    </div>
    <div id="create-team-div" v-if="showCreateTeam">
      <createTeam v-on:team-created="teamCreated()"/>
    </div>
    <div id="team-menu-div" v-if="showTeamMenu">
      <teamsMenu />
    </div>
  </div>
</template>

<script>
import loginfb from "./components/login/login-firebase.vue";
import login from "./components/login/login.vue";
import leftSidebar from "./components/left-sidebar/leftSidebar.vue";
import createTeam from "./components/createTeam/createTeam.vue";
import teamsMenu from "./components/teams-menu/teamsMenu.vue";
const regeneratorRuntime = require("regenerator-runtime");
export default {
  name: "app",
  data() {
    return {
      showLogin: true,
      showSidebar: true,
      showCreateTeam: true,
      showTeamMenu: true,

    };
  },
  components: {
    login,
    loginfb,
    leftSidebar,
    createTeam,
    teamsMenu,
  },
  methods: {
    teamCreated: function() {
        this.showCreateTeam = false;
    }
  }
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
</style>
