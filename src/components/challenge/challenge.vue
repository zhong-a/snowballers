<template>
  <div id="teamsMenu">
    <b>Team Options</b>
    <ul>
      <li v-for="team in teams" :key="team.name">
        <p>
          <span> {{ team.name }} </span> <br />
          <span>
            {{ team.currentMembers }}/{{ team.maxMembers }} members
          </span>
          <button v-on:click="challenge(team)">Challenge Team!</button>
        </p>
      </li>
    </ul>  
  </div>
</template>

<script>
export default {
    props: {
      chal  
    },
    data() {
        return {
            teamsOpenForChallenge: [],
        };
    },
    methods: {
        challenge: function (team) {
            team.challenged = true
            team.challenger = 
        this.$root.$emit("joinTeamBtnClicked");
        this.$store.dispatch("joinTeam", team);
        },
    },
    created: function() {
        //bad cludge, please ignore
        let thisPtr = this
        this.$store.dispatch('fetchChallengeTeams').then(function(teamList) {
        thisPtr.teamsOpenForChallenge = teamList
        })
    }  
}
</script>

<style>
#teamsMenu {
  text-align: left;
}
</style>
