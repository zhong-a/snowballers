<template>
  <div id="teamsMenu">
    <b>Team Options</b>
    <ul>
      <li v-for="team in teams" :key="team.name">
        <p>
          <span> {{ team.name }} </span> <br />
          <span>
            {{ team.currentMembers }}/{{ team.maxMembers }} members, privacy:
            {{ team.pwProtected }}
          </span>
          <div class="passProtec" v-if="team.pwProtected">
            <input v-model.trim="team.inputPassword" type="password" placeholder="password" />
          </div>
          <button v-on:click="join(team)">Join Team</button>
      </li>
    </ul>  
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [],
    };
  },
  methods: {
    join: function (event) {
      if (event.pwProtected) {
          if (event.inputPassword != event.password) {
            alert("this password does not match");
            return;
          }
      }

      this.$root.$emit("joinEventBtnClicked");
      this.$store.dispatch("joinEvent", event);
    },
  },
  created: function() {
    //bad cludge, please ignore
    let thisPtr = this
    this.$store.dispatch('fetchTeams').then(function(teamList) {
      thisPtr.teams = teamList
    })
  }  
}
</script>

<style>
#eventsMenu {
  text-align: left;
}
</style>
