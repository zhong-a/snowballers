<template>
  <div id="app">
    <head>
<!-- <link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura.css" type="text/css">
<link rel="stylesheet" href="https://unpkg.com/browse/normalize.css@8.0.1/"> -->
    </head>

    <div id="sidebar-container">
      
      <div id="login-div" v-if="showLogin">
        <loginfb />
      </div>
      <div v-else-if="showMakeSeeBtns">
        <makeSeeBtns />
      </div>
      
      
    </div>
    <main>
      
      <div id="create-team-div" v-if="showCreateTeam">
        <createTeam v-on:team-created="teamCreated()"/>
      </div>
      <div id="challenge-menu-div" v-if="showOpenChallenges">
        <challenges />
      </div>
      <div id="team-menu-div" v-if="showTeamMenu">
        <teamsMenu />
      </div>
      <div id="create-event-div" v-if="showCreateEvent">
        <createEvent v-on:event-created="eventCreated()"/>
      </div>
      <div id="events-menu-div" v-if="showEventsMenu">
        <eventsMenu />
      </div>
      <div id="chat-div" v-if="showChat">
        <chat />
      </div>
      <div id="main-map" v-if="showMap">
        <Map />
      </div>

    </main>
  </div>
</template>

<script>
import loginfb from "./components/login/login-firebase.vue";
import login from "./components/login/login.vue";
import leftSidebar from "./components/left-sidebar/leftSidebar.vue";
import makeSeeBtns from "./components/left-sidebar/makeSeeBtns.vue";
import createTeam from "./components/createTeam/createTeam.vue";
import teamsMenu from "./components/teams-menu/teamsMenu.vue";
import createEvent from "./components/createEvent/createEvent.vue";
import eventsMenu from "./components/eventsMenu/eventsMenu.vue";
import chat from "./components/chat/chat.vue";
const regeneratorRuntime = require("regenerator-runtime");
import Map from "./components/map/map.vue"; // cant be "map" because of html element name conflict
import challenges from "./components/challenge/challenge.vue";

export default {
  name: "app",
  data() {
    return {
      showLogin: true,
      showCreateTeam: false,
      showTeamMenu: false,
      showMakeSeeBtns: false,
      showMap: true,
      showCreateEvent: /*true*/ false, // hiding since it probably shouldn't appear at login
      showEventsMenu: /*true*/ false, // hiding since it probably shouldn't appear at login
      showChat: true,
      showOpenChallenges: false,
    };
  },
  components: {
    login,
    loginfb,
    leftSidebar,
    makeSeeBtns,
    createTeam,
    teamsMenu,
    Map,
    createEvent,
    eventsMenu,
    chat,
    challenges,
  },
  methods: {
    hideAllComponents: function() {
      this.showLogin = false;
      this.showCreateTeam = false;
      this.showTeamMenu = false;
      this.showMakeSeeBtns = false;
      this.showMap = false;
      this.showShowChallengesBtn = false;
      this.showOpenChallenges = false;

      this.showCreateEvent = false;
      this.showEventsMenu = false;
      this.showChat = false;
    },

    // the components to show in the default home state
    // e.g. after logging in, maybe after creating a team, maybe after creating an event, etc...
    showDefaultHomePage: function() {
      this.showMakeSeeBtns = true;
      this.showMap = true;
      this.showChat = true;
      this.showEventsMenu = true;
    },

    logIn: function() {
      this.hideAllComponents();
      this.showDefaultHomePage();

      this.openMakeSeeBtns();
    },

    logOut: function() {
      this.hideAllComponents();
      this.showLogin = true;
    },

    openCreateTeamForm: function() {
      this.hideAllComponents();
      this.showCreateTeam = true;
    },

    openTeamsMenu: function() {
      this.hideAllComponents();
      this.showTeamMenu = true;
    },

    teamCreated: function() {
      this.hideAllComponents();
      this.showMakeSeeBtns = true;  // will be challenge btns now
    },

    teamJoined: function() {
      this.hideAllComponents();
      this.showMakeSeeBtns = true;
    },

    eventCreated: function() {
      this.hideAllComponents();
      this.showMakeSeeBtns = true;
    },

    eventJoined: function() {
      this.hideAllComponents();
      this.showMakeSeeBtns = true;
    },

    openChallenges: function() {
      this.hideAllComponents();
      this.showOpenChallenges = true;
    },

    openMakeSeeBtns: function() {
      this.hideAllComponents();
      this.showMakeSeeBtns = true;

      // adding this b/c I think it might belong here, remove if not:
      this.showDefaultHomePage();
    }
  },
  mounted: function() {
    this.$root.$on("logInBtnClicked", () => {
      console.log("logloglog")
      this.logIn();
    });

    this.$root.$on("makeTeamBtnClicked", () => {
      this.openCreateTeamForm();
    });
    this.$root.$on("seeTeamsBtnClicked", () => {
      this.openTeamsMenu();
    });

    this.$root.$on("createTeamBtnClicked", () => {
      this.teamCreated();
    });

    this.$root.$on("joinTeamBtnClicked", () => {
      this.teamJoined();
    });

    this.$root.$on("showChallengesBtnClicked", () => {
      this.openChallenges();
    });

    this.$root.$on("showMakeSeeBtnsMenu",  () => {
      this.openMakeSeeBtns();
    });

    this.$root.$on("showLogo", () => {
      this.logo();
    });

    this.$root.$on("logOutBtnClicked", () => {
      this.logOut();
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




/* more css in a new css file */
/* @import url("./App.css"); */

button {
  background-color: skyblue;
  border-radius: 6px;
}
</style>
