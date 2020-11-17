<template>
  <div id="app">
    <div v-if="showSidebar">
      <leftSidebar />
    </div>

    <div id="login-div" v-fi="showLogin">
      <login />
    </div>
  </div>
</template>

<script>
import login from "./components/login/login.vue";
import leftSidebar from "./components/left-sidebar/leftSidebar.vue";
export default {
  name: "app",
  data() {
    return {
      showLogin: true,
      showSidebar: false,
    };
  },
  components: {
    login,
    leftSidebar,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
