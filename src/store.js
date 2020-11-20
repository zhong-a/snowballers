//store.js is for storing the user profile that gets accessed for the components

import Vue from "vue";
import Vuex from "vuex";
import * as fb from "./firebase/firebase";
import router from "./router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: {},
    currentTeam: "",
    owner: false,
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setTeam(state, payload) {
      state.currentTeam = payload.team;
      state.owner = payload.owner;
    }
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      // create user object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        title: form.title,
      });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      let data = userProfile.data()
      data['uid'] = user.uid
      // set user profile in state
      commit("setUserProfile", data);

      // change route to dashboard
      router.push("/");
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
            members: {}
          };
          teamObject["members"][uid] = true;
          await fb.teamsCollection
            .doc(form.teamName)
            .set(teamObject)

          //update our internal state
          commit('setTeam', {team: form.teamName, owner: true})
          await fb.usersCollection.doc(uid).update({
                inteam: form.teamName,
                owner: true,
            })
        return new Promise(function(resolve, reject) {
            resolve("we fukin got there boys")
        });
    }
  }
});
