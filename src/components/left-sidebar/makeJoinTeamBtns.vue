<template>
    <div id="container">
        <button @click="makeTeamBtnClicked">Make Team</button>
        <button @click="joinTeamBtnClicked">Join Team</button>
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

    joinTeamBtnClicked: function() {
      this.$emit("joinTeamBtnClicked");
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
