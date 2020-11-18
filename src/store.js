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
    async createTeam(
      { dispatch },
      teamName,
      maxMembers,
      pwProtected,
      password
    ) {
      return new Promise((resolve, reject) => {
        // see if the team name has been taken
        fb.teamsCollection
          .doc(teamName)
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              reject("already exists");
            } else {
              let teamObject = {
                owner: 4444,
                pwProtected: pwProtected,
                password: password,
                maxMembers: maxMembers,
                members: {}
              };
              teamObject["members"][4444] = true;
              //let uid = this.state.userProfile.uid
              fb.teamsCollection
                .doc(teamName)
                .set(teamObject)
                .then(() => {
                  resolve("team created");
                })
                .catch((error) => reject(error));
            }
          })
          .catch((error) => reject(error));
      });
    }
  }
});
