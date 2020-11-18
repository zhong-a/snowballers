<template>
  <div id="profile-container">
    <img :src="user." />
  </div>
</template>

<script>
export default {
  name: "teamsMenu",
  data() {
    return {
      user: {
        name: "",
        image: "",
      }, // get from firebase
    };
  },
  methods: {},
};
</script>