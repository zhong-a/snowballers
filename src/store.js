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
            dispatch("fetchUserProfile", user);

            return new Promise(function (resolve, reject) {
                resolve("ok");
            });
        },
        async signup({ dispatch }, form) {
            // sign user up
            let user;
            try{
                user = await fb.auth.createUserWithEmailAndPassword(
                    form.email,
                    form.password
                );
                await fb.usersCollection.doc(user.uid).set({
                    name: form.name,
                    title: form.title,
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
            dispatch("fetchUserProfile", user);
            return new Promise(function (resolve, reject) {
                resolve("ok");
            });
        },
        async fetchUserProfile({ commit }, user) {
            // fetch user profile
            const userProfile = await fb.usersCollection.doc(user.uid).get();

            let data = userProfile.data()
            data['uid'] = user.uid
            // set user profile in state
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
            const teams = await fb.teamsCollection.where("challenge", "!=", true).get();
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
            //commit changes local storage
            dispatch("fetchUserProfile", user);
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
            dispatch("fetchUserProfile", user);
        }
    }
});
