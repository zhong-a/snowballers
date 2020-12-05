<template>        
    <div id="challengeMenu">
        <!--div id="accept-or-reject-div" v-if="userTeam.challenged === true">
            <button v-on:click="accept">Accept</button>
            <button v-on:click="reject">Reject</button>
        </div>

        <div v-else-->
        <div>
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
            <b>Team Options</b>
            <ul>
                <li v-for="team in teamsOpenForChallenge" :key="team.name">
                <p>
                    <span> {{ team.name }} </span> <br />
                    <span>
                    {{ team.currentMembers }}/{{ team.maxMembers }} members
                    </span>
                    <button v-on:click="challenge(team.name)">Challenge Team!</button>
                </p>
                </li>
            </ul> 
        </div>
    </div>
</template>

<script>
import * as fb from '../../firebase/firebase'
import Firebase from "firebase";
import { possibleFightLocations } from "./../map/possibleFightLocations.js";
const locationsArray = Object.keys(possibleFightLocations);
export default {
    data() {
        return {
            teamsOpenForChallenge: [],
            userTeamName: "",
            fightLocations: locationsArray,
            selectedLocation: "",
            fightDate: "",
            fightTime: "",
        };
    },
    methods: {
        // i dont think these updates are happening in firestore aka these do not work yet :'(
        challenge: function (team) {
            console.log("challenging a team!")
            console.log(team)
            /*this.userTeam.challenged = true
            team.challenged = true
            team.challenger = this.userTeamName*/
            this.$store
                .dispatch("challengeTeam", {
                        challenging: team,
                        challenger: this.userTeamName,
                        location: this.selectedLocation,
                        date: this.fightDate,
                        time: this.fightTime,
                    }
                )
                .then(() => {
                    this.$root.$emit("showMakeSeeBtnsMenu");   // should become Logo
                })
                .catch((error) => {
                    console.log(error);
                });
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
        let teamID = this.$store.state.userProfile.inteam;
        let team = fb.teamsCollection.doc(teamID).get(); // need to use promises instead of async
        this.userTeamName = teamID;
        console.log("user's team " + this.userTeamName);
        //bad cludge, please ignore
        let thisPtr = this
        this.$store.dispatch('fetchChallengeTeams').then(function(teamList) {
            thisPtr.teamsOpenForChallenge = teamList
            //thisPtr.teamsOpenForChallenge.remove(this.userTeam) // trying to remove own team from teamsOpenForChallenge list
        })
        console.log(thisPtr.teamsOpenForChallenge);
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
