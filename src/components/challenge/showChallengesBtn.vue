<template>
    <div id="container">
        <button @click="showChallengesClicked">Show Challenges</button>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    showChallengesClicked: function() {
      this.$root.$emit("showChallengesBtnClicked");
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
