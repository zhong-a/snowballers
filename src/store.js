//store.js is for storing the user profile that gets accessed for the components

import Vue from "vue";
import Vuex from "vuex";
import * as fb from "./firebase/firebase";
import router from "./router/index";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userProfile: {},
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val;
        },
        setTeam(state, payload) {
            state.currentTeam = payload.team;
            state.owner = payload.owner;
        },
        setEvent(state, payload) {
            state.currentEvent = payload.event;
            state.owner = payload.owner;
        },
    },
    actions: {
        async login({ dispatch }, form) {
            // sign user in
            let user;
            try {
                user = await fb.auth.signInWithEmailAndPassword(
                    form.email,
                    form.password
                );
            } catch(err) {
                console.log(err)
                return new Promise(function (resolve, reject) {
                    reject(err.message);
                });  
            }

            // fetch user profile and set in state
            dispatch("fetchUserProfile", user.user);

            return new Promise(function (resolve, reject) {
                resolve("ok");
            });
        },
        async logout({ dispatch }) {
            try{
                await fb.auth.signOut();
            } catch(err) {
                console.log(err)
                return new Promise(function (resolve, reject) {
                    reject(err.message);
                })
            }
            console.log("fb signout done")
            return new Promise(function(resolve, reject) {
                resolve("log out ok");
            })
        },
        async signup({ dispatch }, form) {
            // sign user up
            let user;
            try{
                user = await fb.auth.createUserWithEmailAndPassword(
                    form.email,
                    form.password
                );
                await fb.usersCollection.doc(user.user.uid).set({
                    name: form.name
                });
            } catch(err) {
                console.log(err)
                return new Promise(function (resolve, reject) {
                    reject(err.message);
                });  
            }
            /*const { user } = await fb.auth.createUserWithEmailAndPassword(
                form.email,
                form.password
            );*/

            // create user object in userCollections
            /*await fb.usersCollection.doc(user.uid).set({
                name: form.name,
                title: form.title,
            });*/

            // fetch user profile and set in state
            dispatch("fetchUserProfile", user.user);
            return new Promise(function (resolve, reject) {
                resolve("ok");
            });
        },
        async fetchUserProfile({ commit }, user) {
            // fetch user profile
            const userProfile = await fb.usersCollection.doc(user.uid).get();

            let data = userProfile.data()
            //check for auto team removal
            if (data.hasOwnProperty('inteam')) {
                let teamid = data.inteam;
                const team = await fb.teamsCollection.doc(teamid).get();
                let teamData = team.data();
                if (teamData.hasOwnProperty('fight')) {
                    let fightid = teamData.fight;
                    const fight = fb.fightsCollection.doc(fightid).get();
                    let fightData = fight.data();

                    let time = fightData.time;
                    const millisecondsInAnHour = 3600000;
                    if (Date.now() < (time + millisecondsInAnHour)) {
                        //The fight has finished
                        //Update the user data
                        delete data.inteam;
                        delete data.owner;
                        await fb.usersCollection.doc(user.uid).set(data);

                        //update the team data
                        delete teamdata.members[user.uid]
                        teamdata.currentMembers = teamdata.currentMembers - 1;
                        if (teamdata.currentMembers === 0) {
                            //the team is now empty, remove it
                            await fb.teamsCollection.doc(teamid).delete();
                        } else {
                            await fb.teamsCollection.doc(teamid).set(teamdata);
                        }
                    } else {
                        alert("What are you doing here? You should be in your snowball fight!")
                    }
                }
            }


            // set user profile in state
            data['uid'] = user.uid
            commit("setUserProfile", data);
            // change route to dashboard
            //router.push("/");
        },
        async createTeam({ commit, state }, form) {
            // see if the team name has been taken
            let snapshot = await fb.teamsCollection
                .doc(form.teamName)
                .get()
            if (snapshot.exists) {
                return new Promise(function (resolve, reject) {
                    reject("already exists")
                });
            }
            let uid = this.state.userProfile.uid
            let teamObject = {
                owner: uid,
                pwProtected: form.pwProtected,
                password: form.password,
                maxMembers: form.maxTeamMembers,
                currentMembers: 1,
                members: {}
            };
            teamObject["members"][uid] = true;
            await fb.teamsCollection
                .doc(form.teamName)
                .set(teamObject)

            //update our internal state
            await fb.usersCollection.doc(uid).update({
                inteam: form.teamName,
                owner: true,
            });
            dispatch("fetchUserProfile", user);
            return new Promise(function (resolve, reject) {
                resolve("we got there boys")
            });
        },
        async fetchTeams({ commit }) {
            // fetch teams
            let teamsList = [];
            const teams = await fb.teamsCollection.where("maxMembers", "!=", "currentMembers").get();
            teams.forEach(function (doc) {
                let data = doc.data();
                data["name"] = doc.id;
                console.log(data)
                teamsList.push(data);
            })
            console.log(teamsList)
            return new Promise(function (resolve, reject) {
                resolve(teamsList);
            })
        },
        async fetchChallengeTeams({ commit }) {
            // fetch teams
            let teamsList = [];
            const teams = await fb.teamsCollection.where("challenged", "!=", true).get();
            teams.forEach(function (doc) {
                let data = doc.data();
                data["name"] = doc.id;
                console.log(data)
                teamsList.push(data);
            })
            console.log(teamsList)
            return new Promise(function (resolve, reject) {
                resolve(teamsList);
            })
        },
        async fetchEvents({ commit }) {
            //fetch events
            let eventsList = [];
            const events = await fb.eventsCollection.where("maxParticipants", "!=", "currentAttending").get();
            events.forEach(function (doc) {
                let data = doc.data();
                data["name"] = doc.id;
                console.log(data);
                eventsList.push(data);
            })
            console.log(eventsList)
            return new Promise(function (resolve, reject) {
                resolve(eventsList);
            })
        },
        async createEvent({ commit, state }, form) {
            // see if the team name has been taken
            let snapshot = await fb.eventsCollection
                .doc(form.eventName)
                .get()
            if (snapshot.exists) {
                return new Promise(function (resolve, reject) {
                    reject("already exists")
                });
            }
            let uid = this.state.userProfile.uid
            let eventObject = {
                owner: uid,
                pwProtected: form.pwProtected,
                password: form.password,
                maxParticipants: form.maxParticipants,
                currentAttending: 1,
                attending: {}
            };
            eventObject["attending"][uid] = true;
            await fb.eventsCollection
                .doc(form.eventName)
                .set(eventObject)

            //update our internal state
            await fb.usersCollection.doc(uid).update({
                attending: form.eventName,
                eventOwner: true,
            })
            dispatch("fetchUserProfile", user);
            return new Promise(function (resolve, reject) {
                resolve("event added")
            });
        },
        async joinTeam({ commit, state }, form) {
            let uid = this.state.userProfile.uid
            //fetch members substructure
            await fb.usersCollection.doc(uid).update({
                inteam: form.name,
                owner: false,
            })
            //update the cloud too 
            form.members[uid] = true;
            await fb.teamsCollection.doc(form.name).update({
                members: form.members,
                currentMembers: form.currentMembers + 1,
            })
            this.state.userProfile.inteam = form.name;
            this.state.userProfile.owner = false;
            //commit changes local storage
            /*this.dispatch("fetchUserProfile", user.user);
            return new Promise(function(resolve, reject) {
                resolve("team joined")
            });*/
        },
        async joinEvent({ commit, state }, form) {
            let uid = this.state.userProfile.uid
            //fetch members substructure
            await fb.usersCollection.doc(uid).update({
                attending: form.name,
                eventOwner: false,
            })
            //update the cloud too 
            form.attending[uid] = true;
            await fb.eventsCollection.doc(form.name).update({
                attending: form.attending,
                currentAttending: form.currentAttending + 1,
            })
            //commit changes local storage
            /*this.dispatch("fetchUserProfile", user);*/
            this.state.userProfile.attending = form.name;
            this.state.userProfile.eventOwner = false;
        },

        async challengeTeam({ commit, state}, form) {
            let uid = this.state.userProfile.uid
            await fb.teamsCollection.doc(form.challenger).update({
                challenged: true,
                challenger: form.challenging,
            })
            await fb.teamsCollection.doc(form.challenging).update({
                challenged: true,
                challenger: form.challenger,
            })

            // need to commit ?
        }
    }
});
