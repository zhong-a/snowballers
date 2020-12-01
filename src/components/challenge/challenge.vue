<template>
  <div id="challengeMenu">
    <b>Team Options</b>
    <div id="accept-or-reject-div" v-if="userTeam.challenged">
        <button v-on:click="accept">Accept</button>
        <button v-on:click="reject">Reject</button>
    </div>
    <div v-else>
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
  </div>
</template>

<script>
import store from '../../store.js'
export default {
    // props: {
    //   userTeam: String,  
    // },
    data() {
        return {
            teamsOpenForChallenge: [],
            userTeam: {},
        };
    },
    methods: {
        // i dont think these updates are happening in firestore aka these do not work yet :'(
        challenge: function (team) {
            this.userTeam.challenged = true // challenged is true if the team has been challenged or sent a challenge
            team.challenged = true
            team.challenger = this.userTeam
        },
        accept: function() {
            this.userTeam.challenged = true;
            fightsCollection.add({
                team1: this.userTeam.name,
                team2: this.userTeam.challenger,
            })
        },
        reject: function() {
            store.state.teams[this.userTeam.challenger].challenged = false;
            this.userTeam.challenger = "";
            this.userTeam.challenged = false;
        },
        
    },
    created: function() {
        this.userTeam = store.state.teams[store.state.userProfile.inteam];  // i think this is super wrong
        //bad cludge, please ignore
        let thisPtr = this
        this.$store.dispatch('fetchChallengeTeams').then(function(teamList) {
            thisPtr.teamsOpenForChallenge = teamList
            thisPtr.teamsOpenForChallenge.remove(this.userTeam) // trying to remove own team from teamsOpenForChallenge list
        })
    }  
}
</script>

<style>
#challengeMenu {
  text-align: left;
}
#accept-or-reject-div button {
    margin: 10px;
    display: inline-block;
}
</style>
