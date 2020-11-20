<template>
    <div id="container">
        <button @click="makeTeamBtnClicked">Make Team</button>
        <button @click="seeTeamsBtnClicked">See Teams</button>
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
