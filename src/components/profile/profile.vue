<template>
  <div id="profile-container">
    <button>Show Profile</button>
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
