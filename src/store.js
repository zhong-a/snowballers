//store.js is for storing the user profile that gets accessed for the components

import Vue from "vue";
import Vuex from "vuex";
import * as fb from "./firebase/firebase";
import router from "./router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: {}
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
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
        title: form.title
      });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      commit("setUserProfile", userProfile.data());

      // change route to dashboard
      router.push("/");
    },
    async createTeam({ state }, form) {
        // see if the team name has been taken
        let snapshot = await fb.teamsCollection
          .doc(form.teamName)
          .get()
        if (snapshot.exists) {
            return new Promise(function (resolve, reject) {
                reject("already exists")
            });
        }
          let teamObject = {
            owner: 4444,
            pwProtected: form.pwProtected,
            password: form.password,
            maxMembers: form.maxTeamMembers,
            members: {}
          };
          teamObject["members"][4444] = true;
          //let uid = this.state.userProfile.uid
          await fb.teamsCollection
            .doc(form.teamName)
            .set(teamObject)
          await fb.usersCollection.doc(state.userProfile.uid).update({
                owns: form.teamName
            })
        return new Promise(function(resolve, reject) {
            resolve("we fukin got there boys")
        });
    }
  }
});
