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
</template>

<script>
export default {
  data() {
    return {
      teams: [],
    };
  },
  methods: {
    join: function (team) {
      if (team.pwProtected) {
          if (team.inputPassword != team.password) {
            alert("this password does not match");
            return;
          }
      }

      this.$root.$emit("joinTeamBtnClicked");
      this.$store.dispatch("joinTeam", team);
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
#teamsMenu {
  text-align: left;
}
</style>
