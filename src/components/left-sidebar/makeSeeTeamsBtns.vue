<template>
    <div id="container">
        <button @click="makeTeamBtnClicked">Make Team</button>
        <button @click="seeTeamsBtnClicked">See Teams</button>
        <button @click="logOut">Log Out</button>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    makeTeamBtnClicked: function() {
      this.$root.$emit("makeTeamBtnClicked");
    },

    seeTeamsBtnClicked: function() {
      this.$root.$emit("seeTeamsBtnClicked");
    },

    logOut: function() {
      console.log("logout button clicked")
      let thisptr = this;
      this.$store.dispatch('logout').then(() => {
        thisptr.$root.$emit("logOutBtnClicked");
      }).catch(err => {
        alert("error with logging out: " + err)
      })
    }
  },
};
</script>

<style>
#container {
  display: flex;
  flex-direction: column;
  width: 30%;
}
template {
  width: 20%;
}
</style>
